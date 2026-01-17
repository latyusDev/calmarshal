"use server"

import { signIn } from "@/app/lib/auth"
import { AuthError } from "next-auth"

export async function handleGoogleSignIn() {
  try {
    await signIn('google', { redirectTo: '/dashboard' })
  } catch (error) {
    if (error instanceof AuthError) {
      // Handle auth errors
      return { error: error.message }
    }
    throw error
  }
}

export async function handleGithubSignIn() {
  try {
    await signIn('github', { redirectTo: '/dashboard' })
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.message }
    }
    throw error
  }
}