
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import PDFUploader from "@/components/PDFUploader";
import FeedbackDisplay, { Feedback } from "@/components/FeedbackDisplay";
import AuthDialog from "@/components/AuthDialog";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { isAuthenticated, openAuthDialog, logout } = useAuth();
  const [currentStep, setCurrentStep] = useState<"upload" | "processing" | "feedback">("upload");
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const handleUpload = async (file: File) => {
    // If user is not authenticated, open auth dialog
    if (!isAuthenticated) {
      openAuthDialog();
      return;
    }

    setCurrentStep("processing");
    
    // Mock processing and feedback generation
    // In a real implementation, this would:
    // 1. Upload the PDF to Supabase storage
    // 2. Extract text from PDF
    // 3. Send text to OpenAI for analysis
    // 4. Parse and display the response
    
    setTimeout(() => {
      const mockFeedback: Feedback = {
        overall: "Your CV demonstrates strong technical skills and education. However, it could benefit from more quantifiable achievements and a clearer structure. Consider adding metrics to showcase your impact and reorganizing sections for better readability.",
        sections: [
          {
            title: "Strong Technical Skills",
            content: "Your technical skills section is comprehensive and showcases relevant technologies for your target roles. The organization by categories (languages, frameworks, tools) makes it easy to scan.",
            type: "positive"
          },
          {
            title: "Education Presentation",
            content: "Your educational background is well presented with clear details on degrees, institutions, and graduation dates.",
            type: "positive"
          },
          {
            title: "Work Experience Impact",
            content: "Your work experience lacks quantifiable achievements. Add metrics to demonstrate your impact (e.g., 'Improved application performance by 40%' rather than just 'Improved application performance').",
            type: "improvement"
          },
          {
            title: "CV Structure",
            content: "The overall structure could be improved by prioritizing most relevant information first. Consider moving your work experience above education if you're not a recent graduate.",
            type: "improvement"
          },
          {
            title: "Personal Projects",
            content: "Adding 1-2 relevant personal projects could strengthen your application, especially if they demonstrate skills relevant to your target position.",
            type: "suggestion"
          },
          {
            title: "ATS Optimization",
            content: "Consider optimizing your CV for Applicant Tracking Systems by incorporating more keywords from job descriptions you're targeting.",
            type: "suggestion"
          }
        ]
      };
      
      setFeedback(mockFeedback);
      setCurrentStep("feedback");
    }, 3000);
  };

  const handleReset = () => {
    setCurrentStep("upload");
    setFeedback(null);
  };

  return (
    <Layout isLoggedIn={isAuthenticated} onLogin={openAuthDialog} onLogout={logout}>
      <AuthDialog />
      
      <div className="container mx-auto px-4 py-12">
        {currentStep === "upload" && (
          <div className="space-y-12">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-cv-blue mb-6">Improve Your CV with AI</h1>
              <p className="text-xl text-cv-gray">
                Upload your CV and our AI assistant will analyze it, providing personalized feedback and suggestions to help you stand out to potential employers.
              </p>
            </div>
            
            <PDFUploader onUpload={handleUpload} isProcessing={false} />
            
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6 rounded-lg bg-white shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-cv-blue font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Upload Your CV</h3>
                <p className="text-cv-gray">Simply upload your CV in PDF format. Your document is analyzed securely.</p>
              </div>
              
              <div className="p-6 rounded-lg bg-white shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-cv-blue font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">AI Analysis</h3>
                <p className="text-cv-gray">Our AI assistant analyzes your CV, checking format, content and optimization opportunities.</p>
              </div>
              
              <div className="p-6 rounded-lg bg-white shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-cv-blue font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Get Feedback</h3>
                <p className="text-cv-gray">Receive personalized suggestions to improve your CV and make it stand out.</p>
              </div>
            </div>
          </div>
        )}
        
        {currentStep === "processing" && (
          <div className="text-center py-16">
            <div className="animate-pulse">
              <h2 className="text-2xl font-semibold text-cv-blue mb-8">Analyzing Your CV...</h2>
              <div className="w-24 h-24 border-4 border-cv-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-8 text-cv-gray">Our AI is carefully reviewing your document. This will take just a moment.</p>
            </div>
          </div>
        )}
        
        {currentStep === "feedback" && feedback && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-cv-blue mb-4">Your CV Analysis</h2>
              <p className="text-xl text-cv-gray max-w-2xl mx-auto">
                Here's our personalized analysis of your CV. Use these insights to improve your chances of landing that dream job.
              </p>
            </div>
            
            <FeedbackDisplay feedback={feedback} />
            
            <div className="text-center mt-12">
              <Button onClick={handleReset} size="lg">
                Analyze Another CV
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
