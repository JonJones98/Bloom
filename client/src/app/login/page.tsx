'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { FormEvent } from 'react'
import { useState } from "react";
import { useRouter } from "next/navigation"

export default function Home() {
  const [activeTab, setActiveTab] = useState("login");
  const router = useRouter();

  // Debug environment variable
  console.log("Environment check:", {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    all_env: Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC'))
  });

  function handleTabChange(value: string) {
    setActiveTab(value);
  }

  // Simple test function to check backend connectivity
  async function testBackendConnection() {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://192.168.1.241:8000';
    console.log("Testing backend connection to:", baseUrl);
    
    try {
      const response = await fetch(`${baseUrl}/health`);
      console.log("Backend test successful:", response.status);
      alert(`Backend connection successful! Status: ${response.status}`);
    } catch (error) {
      console.error("Backend test failed:", error);
      alert(`Backend connection failed: ${(error as Error).message}`);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    console.log("Submitting form...");
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://192.168.1.241:8000';
    
    console.log("Environment variable NEXT_PUBLIC_API_BASE_URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
    console.log("Final baseUrl:", baseUrl);
    
    try {
      // Convert FormData to the format your backend expects
      const formDataObj: Record<string, string> = {};
      formData.forEach((value, key) => {
        formDataObj[key] = value.toString();
      });
      
      let url: string;
      let method: string;
      let requestOptions: RequestInit;
      
      if (activeTab === "signup") {
        // For signup, use POST with UserCreateRequest body
        const requestBody = {
          name: formDataObj.name || "",
          key: formDataObj.password || "", // Backend uses 'key' for password
          role: "user", // Default role
          email: formDataObj.email || ""
        };
        
        url = `${baseUrl}/db/user/add`;
        method = "POST";
        requestOptions = {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(requestBody),
          mode: 'cors',
        };
        
        console.log("Signup request body:", requestBody);
      } else {
        // For login, use GET with UserUpdateRequest body (unusual but that's what your backend expects)
        const requestBody = {
          email: formDataObj.email || "",
          key: formDataObj.password || ""
        };
        
        url = `${baseUrl}/db/user`;
        method = "GET";
        requestOptions = {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(requestBody),
          mode: 'cors',
        };
        
        console.log("Login request body:", requestBody);
      }
      
      console.log("Request URL:", url);
      console.log("Request method:", method);
      console.log("Active tab:", activeTab);
      console.log("Request options:", requestOptions);
      
      console.log("About to make fetch request...");
      
      // Simplified connectivity test
      console.log("Testing browser connectivity to backend...");
      
      try {
        const response = await fetch(url, requestOptions);
        
        console.log("Fetch completed successfully!");
        console.log("Response status:", response.status);
        console.log("Response ok:", response.ok);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Response data:", data);
        
        // Handle success based on your backend's response format
        if (activeTab === "signup") {
          // Signup returns: {"status": "Added user to database: Name"}
          if (data.status && data.status.includes("Added user")) {
            alert("Account created successfully! Please login.");
            setActiveTab("login"); // Switch to login tab
          } else {
            alert(data.message || data.status || "Signup failed");
          }
        } else {
          // Login returns: {"user": {...user data...}}
          if (data.user && data.user.email) {
            // Store user data if needed (localStorage, context, etc.)
            localStorage.setItem('user', JSON.stringify(data.user));
            router.push("/dashboard");
          } else {
            alert("Login failed - user not found or invalid credentials");
          }
        }
        
      } catch (fetchError) {
        console.error("Detailed fetch error:", fetchError);
        console.error("Error name:", (fetchError as Error).name);
        console.error("Error message:", (fetchError as Error).message);
        
        // Try a simple connectivity test
        console.log("Testing basic connectivity...");
        try {
          const testResponse = await fetch(`${baseUrl}/health`, { 
            method: 'GET',
            mode: 'cors'
          });
          console.log("Health check successful:", testResponse.status);
        } catch (healthError) {
          console.error("Health check failed:", healthError);
          alert(`Cannot connect to backend at ${baseUrl}. Please check:\n\n1. Backend server is running\n2. No firewall blocking requests\n3. CORS is properly configured\n\nError: ${(healthError as Error).message}`);
          return;
        }
        
        // Re-throw the original error
        throw fetchError;
      }
      
    } catch (error) {
      console.error("Fetch error:", error);
      
      // More specific error messages
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        alert(`Network Error: Cannot connect to ${baseUrl}. Please check:\n\n1. Is your backend server running?\n2. Is the server running on port 8000?\n3. Are there any CORS issues?\n\nTry running: curl ${baseUrl}/db/user`);
      } else if (error instanceof Error) {
        alert(`Request failed: ${error.message}`);
      } else {
        alert(`Unknown error occurred. Check console for details.`);
      }
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-start my-20 h-full w-full">
        {/* Test button for debugging */}
        {/* <div className="mb-4">
          <Button onClick={testBackendConnection} variant="outline">
            Test Backend Connection
          </Button>
        </div> */}
        <Tabs defaultValue="login" onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
        <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
      <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required  
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
          </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 my-5">
        <Button type="submit" className="w-full">
          Login
        </Button>
      </CardFooter>
      </form>
    </Card>
        </TabsContent>
        <TabsContent value="signup">
        <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create new account</CardTitle>
        <CardDescription>
          Enter your email below to create a new account
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
      <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="signup-fullname">Full Name</Label>
              <Input
                id="signup-fullname"
                name="name"
                type="text"
                placeholder="John Doe"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input
                id="signup-email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="signup-password">Password</Label>
              </div>
              <Input id="signup-password" name="password" type="password" required />
            </div>
          </div>
      </CardContent>
      <CardFooter className="flex-col gap-2  my-5">
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </CardFooter>
      </form>
    </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
