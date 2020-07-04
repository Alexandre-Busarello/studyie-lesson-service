export interface PreferenceVo {
  preferenceName: string,
  priority: number
}

export interface UserPreferenceDto {
  externalId: string,
  preferences: Array<PreferenceVo>
}
