
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface Feedback {
  overall: string;
  sections: {
    title: string;
    content: string;
    type: "positive" | "improvement" | "suggestion";
  }[];
}

interface FeedbackDisplayProps {
  feedback: Feedback;
}

const FeedbackDisplay = ({ feedback }: FeedbackDisplayProps) => {
  return (
    <div className="space-y-8 w-full max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-cv-blue">Analysis Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-cv-gray whitespace-pre-line">{feedback.overall}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {feedback.sections.map((section, index) => (
          <Card key={index} className={
            section.type === "positive" 
              ? "border-l-4 border-l-cv-success" 
              : section.type === "improvement" 
                ? "border-l-4 border-l-cv-warning" 
                : ""
          }>
            <CardHeader>
              <CardTitle className="text-lg">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-cv-gray whitespace-pre-line">{section.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeedbackDisplay;
