
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

const Profile = () => {
  const { user, isAuthenticated, openAuthDialog, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      openAuthDialog();
    }
  }, [isAuthenticated, navigate, openAuthDialog]);

  if (!isAuthenticated || !user) return null;

  return (
    <Layout isLoggedIn={isAuthenticated} onLogin={openAuthDialog} onLogout={logout}>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-cv-blue">Your Profile</h1>
          <p className="text-cv-gray mt-2">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-medium">
                      Full Name
                    </label>
                    <Input id="fullName" defaultValue="User Name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input id="email" type="email" defaultValue={user.email} readOnly />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="industry" className="text-sm font-medium">
                      Industry
                    </label>
                    <Input id="industry" placeholder="e.g. Technology, Finance, etc." />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="jobTitle" className="text-sm font-medium">
                      Current/Target Job Title
                    </label>
                    <Input id="jobTitle" placeholder="e.g. Software Engineer" />
                  </div>
                </div>

                <div className="pt-4">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="currentPassword" className="text-sm font-medium">
                    Current Password
                  </label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="newPassword" className="text-sm font-medium">
                      New Password
                    </label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium">
                      Confirm New Password
                    </label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>
                <div className="pt-4">
                  <Button>Update Password</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Activity Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-1">
                  <p className="text-sm text-cv-gray">Member Since</p>
                  <p className="font-medium">April 19, 2025</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-cv-gray">Total CV Analyses</p>
                  <p className="font-medium">2</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-cv-gray">Last Login</p>
                  <p className="font-medium">Today</p>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8">
              <Button variant="outline" className="w-full text-red-500 hover:text-red-700 hover:bg-red-50">
                Delete Account
              </Button>
              <p className="text-xs text-cv-gray mt-2">
                This will permanently delete your account and all associated data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
