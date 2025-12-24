import { mockTests } from "@/components/data/mock-tests";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminTestsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Tests</h1>

      {mockTests.map((test) => (
        <Card key={test.id}>
          <CardContent className="space-y-2 py-4">
            <p className="font-medium">{test.testName}</p>
            <p className="text-sm text-muted-foreground">
              Assigned to: {test.assignedTo.name}
            </p>
            <p className="text-sm">Duration: {test.durationMinutes} minutes</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
