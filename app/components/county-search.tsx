"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {romanianCounties} from "../data/counties";

interface CountySearchProps {
  onCountySelect: (countySlug: string) => void;
}

export function CountySearch({ onCountySelect }: CountySearchProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between rounded-md"
        >
          {value
            ? romanianCounties[value].name
            : "Caută după numele județului..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Caută după numele județului..." />
          <CommandEmpty>Județul nu a fost găsit.</CommandEmpty>
          <CommandGroup>
            {Object.entries(romanianCounties).map(([countySlug, county]) => (
              <CommandItem
                key={countySlug}
                value={countySlug}
                onSelect={(currentValue) => {
                  setValue(currentValue);
                  onCountySelect(currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value.toLowerCase() === countySlug.toLowerCase()
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {county.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}