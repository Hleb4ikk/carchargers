import {
  Card,
  CardContent,
  CardHeader,
  Separator,
} from "@/components/Card/Card";

export default function Contacts() {
  return (
    <Card className="p-4 border-1 rounded-lg border-[#e0e0e0] flex flex-col gap-2">
      <CardHeader className="font-bold text-2xl">Свяжитесь с Нами</CardHeader>
      <Separator />
      <CardContent className="flex gap-2 flex-col">
        <p>Есть вопросы о продуктах или вашем заказе? Мы будем рады помочь.</p>
        <p>Email: sales@evchargerstore.example.com</p>
        <p>Телефон: (123) 456-7890</p>
        <p>Адрес: 123 Commerce St, E-Sales City, ES 98765</p>
      </CardContent>
    </Card>
  );
}
