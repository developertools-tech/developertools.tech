import { useRouter } from "next/router";

import  en  from "../data/locale/en";
import  ja  from "../data/locale/ja";

export default function useLocale() {
  const router = useRouter()
  return router.locale === "ja" ? ja : en
}