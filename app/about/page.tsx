import {
  Card,
  CardContent,
  CardHeader,
  Separator,
} from "@/components/Card/Card";

export default function About() {
  return (
    <Card className="p-4 border-1 rounded-lg border-[#e0e0e0] flex flex-col gap-2">
      <CardHeader className="font-bold text-2xl">О проекте</CardHeader>
      <Separator />
      <CardContent className="flex gap-2 flex-col">
        <p>
          Добро пожаловать в наш интернет-магазин зарядных устройств для
          электромобилей! Мы предлагаем широкий ассортимент домашних и
          коммерческих зарядных станций, кабелей и аксессуаров от ведущих
          производителей. Наша цель — предоставить вам надежные и эффективные
          решения для зарядки вашего электромобиля.
        </p>
        <p>
          Мы тщательно подбираем продукты, уделяя внимание качеству,
          безопасности и совместимости с различными моделями электромобилей.
          Изучите наш каталог и найдите идеальное зарядное устройство для ваших
          нужд.
        </p>
      </CardContent>
    </Card>
  );
}
