import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "../Input/Input";
import { TextArea } from "../TextArea/TextArea";
import { X } from "lucide-react";
import Link from "next/link";
import { ProductCounter } from "./ProductCounter/ProductCounter";
import dotenv from "dotenv";

export const SubmitProductForm = ({
  trigger,
  productImageUrl,
  productTitle,
  submitButton,
  productPrice,
}: {
  trigger: React.ReactNode;
  productImageUrl: string;
  productTitle: string;
  productPrice: number;
  submitButton: React.ReactNode;
}) => {
  const [messages, setMessages] = useState<Record<string, string[]>>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const formFields = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      comment: formData.get("comment") as string,
      counter: formData.get("counter") as string,
      privacyAndTerms: formData.get("privacyAndTerms") as string | null,
    };

    function validateForm(formFields: Record<string, string | null>): boolean {
      let isValid = true;
      for (const formField in formFields) {
        if (formFields[formField] === null || formFields[formField] === "") {
          isValid = false;
          setMessages((prevMessages) => {
            return {
              ...prevMessages,
              [formField]: ["Поле обязательно для заполнения"],
            };
          });
        } else {
          setMessages((prevMessages) => {
            const newMessages = { ...prevMessages };
            newMessages[formField] = [];
            return newMessages;
          });
        }
      }
      return isValid;
    }

    if (validateForm(formFields)) {
      async function sendForm() {
        //TODO: send form to google sheets
      }
      sendForm();
    }
  }

  return (
    <AlertDialog
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setMessages({});
        }
      }}
    >
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col bg-white border-none">
        <div className="flex justify-between">
          <AlertDialogTitle className="flex justify-between">
            Купить
          </AlertDialogTitle>
          <AlertDialogCancel asChild>
            <Button className="border-none shadow-none cursor-pointer">
              <X size={50} />
            </Button>
          </AlertDialogCancel>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-3 items-center">
            <img
              className="max-w-[100px]"
              src={productImageUrl}
              alt={productTitle}
            />
            <div className="flex flex-col gap-2">
              <h2 className="font-bold">{productTitle}</h2>
              <ProductCounter productPrice={productPrice} name="counter" />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 w-full">
              <Input placeholder="Ваше имя" type="text" name="name" />
              {messages.name && (
                <p className="text-red-500">{messages.name[0]}</p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Input placeholder="Телефон" type="text" name="phone" />
              {messages.phone && (
                <p className="text-red-500">{messages.phone[0]}</p>
              )}
            </div>
          </div>
          <TextArea
            className="h-[150px]"
            placeholder="Комментарий"
            name="comment"
          />
          <div>
            <div className="flex gap-2">
              <input
                id="privacyAndTerms"
                type="checkbox"
                name="privacyAndTerms"
              />
              <label
                className="hyphens-auto text-sm"
                htmlFor="privacyAndTerms"
                lang="ru"
              >
                Нажимая на кнопку «Отправить», я даю согласие на обработку
                персональных данных и соглашаюсь c
                <Link
                  className="ml-1 underline hover:text-gray-900 active:text-gray-700"
                  href={"/privacy"}
                >
                  политикой конфиденциальности
                </Link>
                .
              </label>
            </div>
            {messages.privacyAndTerms && (
              <p className="text-red-500">{messages.privacyAndTerms[0]}</p>
            )}
          </div>
          {submitButton}
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
