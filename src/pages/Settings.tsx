
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useToast } from '@/components/ui/use-toast';

const Settings = () => {
  const { toast } = useToast();
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your dashboard settings have been updated."
    });
  };

  return (
    <div className="dark flex min-h-screen bg-background">
      <DashboardSidebar onUploadClick={() => {}} />
      
      <div className="flex-1 p-6 space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="data">Data Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure your dashboard preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-refresh" className="text-base font-medium">Auto Refresh</Label>
                    <p className="text-sm text-muted-foreground">Automatically refresh charts when new data is available</p>
                  </div>
                  <Switch id="auto-refresh" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notifications" className="text-base font-medium">Dashboard Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications about important events</p>
                  </div>
                  <Switch id="notifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="tooltips" className="text-base font-medium">Show Tooltips</Label>
                    <p className="text-sm text-muted-foreground">Display detailed tooltips on chart hover</p>
                  </div>
                  <Switch id="tooltips" defaultChecked />
                </div>

                <Button onClick={handleSaveSettings}>Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize the look and feel of your dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dark-mode" className="text-base font-medium">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Use dark theme for the dashboard</p>
                  </div>
                  <Switch id="dark-mode" defaultChecked />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="chart-animation">Chart Animation Speed</Label>
                  <Input id="chart-animation" type="range" min="0" max="2" step="0.1" defaultValue="1" />
                </div>
                
                <div className="grid gap-2">
                  <FormItem>
                    <FormLabel>Color Theme</FormLabel>
                    <div className="flex gap-4">
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Input id="default-theme" type="radio" name="theme" className="h-4 w-4" defaultChecked />
                          <Label htmlFor="default-theme">Default</Label>
                        </div>
                      </FormControl>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Input id="vibrant-theme" type="radio" name="theme" className="h-4 w-4" />
                          <Label htmlFor="vibrant-theme">Vibrant</Label>
                        </div>
                      </FormControl>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Input id="pastel-theme" type="radio" name="theme" className="h-4 w-4" />
                          <Label htmlFor="pastel-theme">Pastel</Label>
                        </div>
                      </FormControl>
                    </div>
                  </FormItem>
                </div>

                <Button onClick={handleSaveSettings}>Save Appearance</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="data" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>Manage your data preferences and storage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="cache-data" className="text-base font-medium">Cache Data Locally</Label>
                    <p className="text-sm text-muted-foreground">Store processed data in browser for faster loading</p>
                  </div>
                  <Switch id="cache-data" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-export" className="text-base font-medium">Auto Export</Label>
                    <p className="text-sm text-muted-foreground">Automatically export new data as JSON</p>
                  </div>
                  <Switch id="auto-export" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="data-retention">Data Retention Period</Label>
                  <select id="data-retention" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="7">7 days</option>
                    <option value="30">30 days</option>
                    <option value="90">90 days</option>
                    <option value="365">1 year</option>
                    <option value="0">Unlimited</option>
                  </select>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="w-full">Export All Data</Button>
                  <Button variant="destructive" className="w-full">Clear Cache</Button>
                </div>

                <Button onClick={handleSaveSettings}>Save Data Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
