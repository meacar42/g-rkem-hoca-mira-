import { FrameTypeLabel, Gender } from '@/types/IProduct'

export const frameTypeLabels: Record<FrameTypeLabel, string> = {
    [FrameTypeLabel.FULL_RIM]: 'Tam Çerçeve',
    [FrameTypeLabel.SEMI_RIMLESS]: 'Yarım Çerçeve',
    [FrameTypeLabel.RIMLESS]: 'Çerçevesiz',
    [FrameTypeLabel.CATE_EYE]: 'Kedi Gözü',
    [FrameTypeLabel.ROUND]: 'Yuvarlak',
    [FrameTypeLabel.AVIATOR]: 'Pilot',
    [FrameTypeLabel.SQUARE]: 'Kare',
    [FrameTypeLabel.RECTANGLE]: 'Dikdörtgen',
    [FrameTypeLabel.WAYFARER]: 'Wayfarer',
    [FrameTypeLabel.OVERSIZED]: 'Büyük Boy',
}

export const genderLabels: Record<Gender, string> = {
    [Gender.MALE]: 'Erkek',
    [Gender.FEMALE]: 'Kadın',
    [Gender.UNISEX]: 'Unisex',
}
