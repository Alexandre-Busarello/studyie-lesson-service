export interface PreferenceVo {
  preferenceName: string,
  priotity: number
}

export interface UserPreferenceDto {
  externalId: string,
  preferences: Array<PreferenceVo>
}
