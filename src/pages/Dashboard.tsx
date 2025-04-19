
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText as FileTextIcon, Upload as UploadIcon } from "lucide-react";

const Dashboard = () => {
  const { isAuthenticated, openAuthDialog, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      openAuthDialog();
    }
  }, [isAuthenticated, navigate, openAuthDialog]);

  // Mock data for recent CV analyses
  const recentAnalyses = [
    {
      id: "cv-1",
      name: "Developer_CV_2023.pdf",
      date: "April 19, 2025",
      improvementScore: 7.5,
    },
    {
      id: "cv-2",
      name: "Product_Manager_CV.pdf",
      date: "April 15, 2025",
      improvementScore: 8.2,
    },
  ];

  if (!isAuthenticated) return null;

  return (
    <Layout isLoggedIn={isAuthenticated} onLogin={openAuthDialog} onLogout={logout}>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold text-cv-blue">Dashboard</h1>
            <p className="text-cv-gray mt-2">Manage your CV analyses and track improvements</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button onClick={() => navigate("/")}>
              <UploadIcon className="mr-2 h-4 w-4" />
              Upload New CV
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Analyses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-cv-blue">2</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-cv-blue">7.8</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Improvement Opportunity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-cv-warning">+20%</p>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Recent CV Analyses</h2>
          
          <div className="space-y-4">
            {recentAnalyses.map(analysis => (
              <Card key={analysis.id} className="overflow-hidden">
                <div className="flex items-center">
                  <div className="p-4 bg-blue-50 flex items-center justify-center">
                    <FileTextIcon className="h-8 w-8 text-cv-blue" />
                  </div>
                  <CardContent className="flex-grow py-4">
                    <p className="font-medium">{analysis.name}</p>
                    <p className="text-sm text-cv-gray">Analyzed on {analysis.date}</p>
                  </CardContent>
                  <CardContent className="flex flex-col items-center justify-center pr-4">
                    <p className="text-sm text-cv-gray">Improvement Score</p>
                    <p className="text-xl font-semibold text-cv-blue">{analysis.improvementScore}/10</p>
                  </CardContent>
                  <CardFooter className="py-0 pr-4">
                    <Button variant="outline" onClick={() => navigate(`/history/${analysis.id}`)}>
                      View Details
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
