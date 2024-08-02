import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      formatDate: (date: any) => {
        const newDate = new Date(date);
        return format(newDate, "dd/MM/yy 'às' HH:mm", { locale: ptBR });
      },
    },
  };
});
