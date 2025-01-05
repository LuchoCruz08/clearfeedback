/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { MessageSquare, User, Lock, AlertTriangle } from "lucide-react";

interface UserProfile {
  id: string;
  email: string;
  updated_at: string;
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { toast } = useToast();
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setProfile({
          id: user.id,
          email: user.email || "",
          updated_at: user.updated_at || "",
        });
        setEmail(user.email || "");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error loading profile",
      });
    } finally {
      setLoading(false);
    }
  }

  async function updatePassword() {
    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "New passwords don't match",
      });
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Password updated successfully",
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error updating password",
      });
    }
  }

  async function deleteAccount() {
    try {
      const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", profile?.id);

      if (error) throw error;

      await supabase.auth.signOut();
      router.push("/login");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error deleting account",
      });
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-purple-800">
          Account Settings
        </h2>
        <p className="text-gray-600">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="border-purple-100 shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="border-b border-purple-100 bg-purple-50">
            <CardTitle className="text-purple-800 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-purple-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                disabled
                className="bg-purple-50 border-purple-200 text-purple-800"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-100 shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="border-b border-purple-100 bg-purple-50">
            <CardTitle className="text-purple-800 flex items-center">
              <Lock className="w-5 h-5 mr-2" />
              Change Password
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="current-password" className="text-purple-700">
                Current Password
              </Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-purple-700">
                New Password
              </Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-purple-700">
                Confirm New Password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <Button
              onClick={updatePassword}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Update Password
            </Button>
          </CardContent>
        </Card>

        <Card className="border-red-100 shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="border-b border-red-100 bg-red-50">
            <CardTitle className="text-red-800 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete Account
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white border-red-200">
                <DialogHeader>
                  <DialogTitle className="text-red-800">
                    Are you absolutely sure?
                  </DialogTitle>
                  <DialogDescription className="text-red-600">
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => {}}>
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={deleteAccount}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Yes, delete my account
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
