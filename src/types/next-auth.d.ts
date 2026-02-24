import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      degree: number
      position?: string
    } & DefaultSession['user']
  }

  interface User {
    degree: number
    position?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    degree: number
    position?: string
  }
}
