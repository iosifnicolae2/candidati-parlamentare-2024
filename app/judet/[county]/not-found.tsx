import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Județ negăsit</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Ne pare rău, dar județul căutat nu există.
        </p>
        <Button asChild>
          <Link href="/">
            Înapoi la pagina principală
          </Link>
        </Button>
      </div>
    </div>
  );
}