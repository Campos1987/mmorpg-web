export const REGISTER_COUNTRIES = [
  { value: "BR", label: "Brasil" },
  { value: "PT", label: "Portugal" },
  { value: "US", label: "Estados Unidos" },
] as const;

export const REGISTER_MONTHS = [
  { value: "01", label: "Janeiro" },
  { value: "02", label: "Fevereiro" },
  { value: "03", label: "Março" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Maio" },
  { value: "06", label: "Junho" },
  { value: "07", label: "Julho" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
] as const;

export const REGISTER_DAYS = Array.from({ length: 31 }, (_, index) => {
  const day = String(index + 1).padStart(2, "0");
  return { value: day, label: day };
});

const CURRENT_YEAR = new Date().getFullYear();
const MIN_BIRTH_YEAR = CURRENT_YEAR - 100;
const MAX_BIRTH_YEAR = CURRENT_YEAR - 16;

export const REGISTER_YEARS = Array.from(
  { length: MAX_BIRTH_YEAR - MIN_BIRTH_YEAR + 1 },
  (_, index) => {
    const year = String(MAX_BIRTH_YEAR - index);
    return { value: year, label: year };
  },
);
