import type { Locale } from "@/i18n/config";
import { conditionsRu } from "./conditions-ru";
import { conditionsUz } from "./conditions-uz";
import type { Condition } from "./types";

const conditions = { ru: conditionsRu, uz: conditionsUz };

/** Conditions by direction id: the «С чем обращаются» entries that open a dialog. */
export const getConditions = (locale: Locale): Record<string, Condition[]> => conditions[locale];
