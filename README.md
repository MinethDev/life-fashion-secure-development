# Life Fashion – Secure Software Development

## Group Members

| Member Name | Index Number |
| Wahalathanthri E I | IT23290310 |
| Perera W M M | IT23310346 |
| Senura Virantha S.J. | IT23423206 |
| Vidusini W.M.O | IT23379756 |

## Project Description

This project is a security-enhanced version of the Life Fashion e-commerce application developed for the Secure Software Development assignment.

The original application was analyzed to identify security vulnerabilities. Seven distinct vulnerabilities were identified and addressed using appropriate secure software development practices.

The project also includes an implementation of Google OAuth 2.0 authentication as the required authentication enhancement.

## Original Project

GitHub Repository:

https://github.com/Oshada40K/Group-project.git

## Modified Project

GitHub Repository:

https://github.com/MinethDev/life-fashion-secure-development.git

## Security Vulnerabilities Addressed

The following vulnerabilities were identified and fixed:

1. Client-Controlled Role Assignment / Privilege Escalation
2. Missing Authorization on Employee Management
3. User Enumeration Through Login Error Messages
4. Unauthorized Modification of Another User's Order Payment Status
5. Client-Side Price Manipulation in Cash on Delivery Orders
6. Client-Controlled Stripe Payment Verification
7. Missing Security Headers

## Authentication Enhancement

Google OAuth 2.0 authentication was implemented using Passport.js and the Google OAuth 2.0 strategy.

The implementation allows users to authenticate through their Google account and integrates the authenticated user with the existing application authentication flow.

## Technologies Used

- React
- Vite
- Node.js
- Express.js
- MongoDB
- Mongoose
- Passport.js
- Google OAuth 2.0
- Stripe
- Razorpay
- Helmet
- JWT
- bcrypt

## GitHub Commit History

The modified repository contains separate commits for the security fixes and OAuth implementation. Detailed commit messages have been used to document the development and security improvements.

## Assignment

**Module:** SE4030 – Secure Software Development

**Project:** Life Fashion – Security Vulnerability Identification and Mitigation