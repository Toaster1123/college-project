"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import {
  Button,
  Calendar,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function DateInput({ label, value, onChange }: Props) {
  const [open, setOpen] = React.useState(false);

  const parse = (val: string) => {
    const [d, m, y] = val.split(".");
    if (!d || !m || !y) return undefined;
    const date = new Date(`${y}-${m}-${d}`);
    return isNaN(date.getTime()) ? undefined : date;
  };

  const date = parse(value);

  const formatDate = (date: Date | undefined) =>
    date ? format(date, "dd.MM.yyyy", { locale: ru }) : "";

  const handleInput = (text: string) => {
    let v = text.replace(/\D/g, "");

    if (v.length >= 3 && v.length <= 4) {
      v = v.replace(/(\d{2})(\d+)/, "$1.$2");
    }
    if (v.length >= 5) {
      v = v.replace(/(\d{2})(\d{2})(\d+)/, "$1.$2.$3");
    }

    onChange(v);
  };

  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <div className="relative">
        <Input
          value={value}
          placeholder="дд.мм.гггг"
          onChange={(e) => handleInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-4" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => {
                onChange(formatDate(d));
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
