import { useState } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import PDFUploader from "@/components/PDFUploader";
import FeedbackDisplay, { Feedback } from "@/components/FeedbackDisplay";
import AuthDialog from "@/components/AuthDialog";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { extractTextFromPDF } from "@/utils/pdfUtils";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const { isAuthenticated, openAuthDialog, logout } = useAuth();
  const [currentStep, setCurrentStep] = useState<"upload" | "processing" | "feedback">("upload");
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const handleUpload = async (file: File) => {
    if (!isAuthenticated) {
      openAuthDialog();
      return;
    }

    setCurrentStep("processing");
    
    try {
      // Extract text from PDF
      const text = await extractTextFromPDF(file);
      
      // Call the analyze-cv Edge Function
      const { data, error } = await supabase.functions.invoke('analyze-cv', {
        body: { cvText: text }
      });

      if (error) {
        throw error;
      }

      setFeedback(data);
      setCurrentStep("feedback");
    } catch (error) {
      console.error('Error analyzing CV:', error);
      toast({
        title: "Error",
        description: "Ha ocurrido un error al analizar tu CV. Por favor, inténtalo de nuevo.",
        variant: "destructive"
      });
      setCurrentStep("upload");
    }
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
