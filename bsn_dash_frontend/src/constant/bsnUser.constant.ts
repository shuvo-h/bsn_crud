import { TBSN_USER_STATUS } from "@/interface/enums";

export const BSN_USER_STATUS_LIST = [
    // { label: 'Earnings', value: 'earnings' },
    ...Object.keys(TBSN_USER_STATUS)
    .filter(key => isNaN(Number(key)))
    .map((key) => ({
      label: key,
      value: TBSN_USER_STATUS[key as keyof typeof TBSN_USER_STATUS],
    })),
  ];