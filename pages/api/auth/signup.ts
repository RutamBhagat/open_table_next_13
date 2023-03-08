// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as jose from "jose";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { firstName, lastName, email, password, phone, city } = req.body;
    const validationSchema = [
      {
        valid: validator.isLength(firstName, { min: 1, max: 20 }),
        errorMessage: "First name must be between 1 and 20 characters",
      },
      {
        valid: validator.isLength(lastName, { min: 1, max: 20 }),
        errorMessage: "Last name must be between 1 and 20 characters",
      },
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is not valid",
      },
      {
        valid: validator.isStrongPassword(password),
        errorMessage: "Weak password",
      },
      {
        valid: validator.isMobilePhone(phone),
        errorMessage: "Phone is not valid",
      },
      {
        valid: validator.isLength(city, { min: 1, max: 20 }),
        errorMessage: "City name must be between 1 and 20 characters",
      },
    ];

    validationSchema.forEach((check) => {
      if (!check.valid) {
        res.status(400).json({ error: check.errorMessage });
        return;
      }
    });

    const userByEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (userByEmail) {
      res.status(400).json({ error: "Email already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //create user in db using prisma client
    const user = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: hashedPassword,
        phone: phone,
        city: city,
      },
    });

    const algo = "HS256";
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    //Token creation
    const token = await new jose.SignJWT({ email: email })
      .setProtectedHeader({ alg: algo })
      .setExpirationTime("24h")
      .sign(secret);

    return res.status(200).json({ token });
  } else {
    return res.status(405).json({ name: "Method not allowed" });
  }
}