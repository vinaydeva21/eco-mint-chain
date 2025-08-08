import { Helmet } from "react-helmet-async";
import TopNav from "@/components/layout/TopNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Profile & Settings – KarbonLedger CETP</title>
        <meta name="description" content="Manage identity, notifications, connected devices, and API access." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : '/profile'} />
      </Helmet>
      <TopNav />
      <main className="flex-1 container mx-auto px-4 py-10">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Basic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm">Name: Demo User</div>
              <div className="text-sm">Role: Operator</div>
              <div className="text-sm">Verification: Pending</div>
              <Button variant="secondary" size="sm" className="mt-2">Edit</Button>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Notifications & security</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-md border p-4">
                <div className="font-medium">Notifications</div>
                <p className="text-sm text-muted-foreground">Compliance, votes, and marketplace updates</p>
                <Button variant="secondary" size="sm" className="mt-3">Configure</Button>
              </div>
              <div className="rounded-md border p-4">
                <div className="font-medium">Security</div>
                <p className="text-sm text-muted-foreground">2FA & wallet recovery</p>
                <Button variant="secondary" size="sm" className="mt-3">Manage</Button>
              </div>
              <div className="rounded-md border p-4">
                <div className="font-medium">Connected Devices</div>
                <p className="text-sm text-muted-foreground">Linked IoT sensors & gateways</p>
                <Button variant="secondary" size="sm" className="mt-3">View</Button>
              </div>
              <div className="rounded-md border p-4">
                <div className="font-medium">API Access Keys</div>
                <p className="text-sm text-muted-foreground">Integrate with external systems</p>
                <Button variant="secondary" size="sm" className="mt-3">Generate</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;
