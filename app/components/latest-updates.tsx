import { CalendarDays } from "lucide-react";

export function LatestUpdates() {
  const updates = [
    {
      date: "2024-03-15",
      title: "Actualizare liste candidați București",
      description: "Au fost actualizate listele de candidați pentru București.",
    },
    {
      date: "2024-03-14",
      title: "Modificări în județul Cluj",
      description: "Modificări în listele de candidați pentru județul Cluj.",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-4">Ultimele actualizări</h2>
      <div className="space-y-4">
        {updates.map((update, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 border-b border-gray-200 dark:border-gray-700 pb-4"
          >
            <CalendarDays className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <time className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(update.date).toLocaleDateString("ro-RO")}
              </time>
              <h3 className="font-medium">{update.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {update.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}