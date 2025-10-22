enum UserRole {
    CLIENT = 'CLIENT',
}

type UserRoleLiteral = keyof typeof UserRole

export const getUserRoleFromLiteral = (literal: UserRoleLiteral): UserRole => {
    return UserRole[literal]
}

export default UserRole
