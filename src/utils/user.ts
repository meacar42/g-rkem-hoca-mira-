import { ICurrentUser } from "@/contexts/user-context"

/**
 * Kullanıcının tam adını döndürür
 * @param user - Kullanıcı bilgileri
 * @returns name + surname veya email'in @ öncesi kısmı
 */
export function getUserDisplayName(user: ICurrentUser | null): string {
    if (!user) return 'Guest'

    // İsim ve soyisim varsa birleştir
    const fullName = [user.name, user.surname].filter(Boolean).join(' ').trim()

    if (fullName) return fullName

    // İsim yoksa email'in @ öncesi kısmını kullan
    return user.email.split('@')[0]
}

/**
 * Kullanıcının rol bazlı yetkilerini kontrol eder
 * @param user - Kullanıcı bilgileri
 * @param requiredRole - Gerekli rol
 * @returns boolean
 */
export function hasRole(user: ICurrentUser | null, requiredRole: string): boolean {
    return user?.role === requiredRole
}

/**
 * Kullanıcının admin olup olmadığını kontrol eder
 * @param user - Kullanıcı bilgileri
 * @returns boolean
 */
export function isAdmin(user: ICurrentUser | null): boolean {
    return hasRole(user, 'admin')
}
