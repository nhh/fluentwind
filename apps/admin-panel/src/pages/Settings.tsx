import { useState } from 'react';
import {
  Card,
  Text,
  Input,
  Textarea,
  Select,
  Switch,
  Button,
  Field,
  Divider,
  Tablist,
  Tab,
  Avatar,
  Badge,
  RadioGroup,
  Radio,
  Alert,
} from '@fluentwind/react';
import {
  Camera,
  Save,
  Shield,
  Smartphone,
  Monitor,
  Lock,
  KeyRound,
  LogOut,
} from 'lucide-react';

export default function Settings() {
  const [tab, setTab] = useState('general');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-l">
      {saved && (
        <Alert intent="success">
          Settings saved successfully.
        </Alert>
      )}

      <Tablist
        selectedValue={tab}
        onTabSelect={(value) => setTab(value)}
      >
        <Tab value="general">General</Tab>
        <Tab value="notifications">Notifications</Tab>
        <Tab value="security">Security</Tab>
        <Tab value="appearance">Appearance</Tab>
      </Tablist>

      {tab === 'general' && (
        <div className="space-y-m">
          {/* Profile section */}
          <Card className="p-l">
            <Text className="text-400 leading-400 font-semibold text-neutral-foreground-1 mb-m block">
              Profile
            </Text>
            <div className="flex items-start gap-l mb-l">
              <Avatar name="Sarah Chen" size={72} color="brand" />
              <div className="space-y-xs">
                <Text className="text-300 font-semibold text-neutral-foreground-1 block">
                  Sarah Chen
                </Text>
                <Text className="text-200 text-neutral-foreground-3 block">
                  sarah.chen@example.com
                </Text>
                <Button appearance="outline" size="small">
                  <Camera size={14} className="mr-xxs" /> Change Avatar
                </Button>
              </div>
            </div>
            <Divider className="my-m" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-m">
              <Field label="Full Name">
                <Input defaultValue="Sarah Chen" />
              </Field>
              <Field label="Email">
                <Input type="email" defaultValue="sarah.chen@example.com" />
              </Field>
              <Field label="Job Title">
                <Input defaultValue="Product Manager" />
              </Field>
              <Field label="Department">
                <Select defaultValue="engineering">
                  <option value="engineering">Engineering</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
                </Select>
              </Field>
              <Field label="Bio" className="md:col-span-2">
                <Textarea
                  defaultValue="Product manager focused on developer tools and internal platforms."
                  rows={3}
                />
              </Field>
            </div>
          </Card>

          {/* Company section */}
          <Card className="p-l">
            <Text className="text-400 leading-400 font-semibold text-neutral-foreground-1 mb-m block">
              Organization
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-m">
              <Field label="Company Name">
                <Input defaultValue="Contoso Ltd." />
              </Field>
              <Field label="Industry">
                <Select defaultValue="technology">
                  <option value="technology">Technology</option>
                  <option value="finance">Finance</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                </Select>
              </Field>
              <Field label="Timezone">
                <Select defaultValue="europe-berlin">
                  <option value="us-pacific">US Pacific (UTC-7)</option>
                  <option value="us-eastern">US Eastern (UTC-4)</option>
                  <option value="europe-london">Europe/London (UTC+1)</option>
                  <option value="europe-berlin">Europe/Berlin (UTC+2)</option>
                  <option value="asia-tokyo">Asia/Tokyo (UTC+9)</option>
                </Select>
              </Field>
              <Field label="Language">
                <Select defaultValue="en">
                  <option value="en">English</option>
                  <option value="de">Deutsch</option>
                  <option value="fr">Francais</option>
                  <option value="ja">Japanese</option>
                </Select>
              </Field>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button appearance="primary" onClick={handleSave}>
              <Save size={14} className="mr-xxs" /> Save Changes
            </Button>
          </div>
        </div>
      )}

      {tab === 'notifications' && (
        <Card className="p-l">
          <Text className="text-400 leading-400 font-semibold text-neutral-foreground-1 mb-l block">
            Notification Preferences
          </Text>
          <div className="space-y-l">
            {[
              {
                title: 'Email Notifications',
                description: 'Receive email updates about account activity',
                defaultChecked: true,
              },
              {
                title: 'Security Alerts',
                description: 'Get notified about new sign-ins and security events',
                defaultChecked: true,
              },
              {
                title: 'Product Updates',
                description: 'Receive newsletters about new features and improvements',
                defaultChecked: false,
              },
              {
                title: 'Weekly Report',
                description: 'Get a weekly summary of your team activity',
                defaultChecked: true,
              },
              {
                title: 'Marketing Emails',
                description: 'Receive promotional content and special offers',
                defaultChecked: false,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between py-s"
              >
                <div>
                  <Text className="text-300 font-medium text-neutral-foreground-1 block">
                    {item.title}
                  </Text>
                  <Text className="text-200 text-neutral-foreground-3 block">
                    {item.description}
                  </Text>
                </div>
                <Switch defaultChecked={item.defaultChecked} />
              </div>
            ))}
          </div>
          <Divider className="my-m" />
          <div className="flex justify-end">
            <Button appearance="primary" onClick={handleSave}>
              <Save size={14} className="mr-xxs" /> Save Preferences
            </Button>
          </div>
        </Card>
      )}

      {tab === 'security' && (
        <div className="space-y-m">
          <Card className="p-l">
            <Text className="text-400 leading-400 font-semibold text-neutral-foreground-1 mb-m block">
              Change Password
            </Text>
            <div className="space-y-m max-w-md">
              <Field label="Current Password">
                <Input type="password" placeholder="Enter current password" />
              </Field>
              <Field label="New Password">
                <Input type="password" placeholder="Enter new password" />
              </Field>
              <Field label="Confirm Password">
                <Input type="password" placeholder="Confirm new password" />
              </Field>
              <Button appearance="primary" onClick={handleSave}>
                <Lock size={14} className="mr-xxs" /> Update Password
              </Button>
            </div>
          </Card>

          <Card className="p-l">
            <Text className="text-400 leading-400 font-semibold text-neutral-foreground-1 mb-m block">
              Two-Factor Authentication
            </Text>
            <div className="flex items-center justify-between">
              <div>
                <Text className="text-300 text-neutral-foreground-1 block">
                  Authenticator App
                </Text>
                <Text className="text-200 text-neutral-foreground-3 block">
                  Use an authenticator app to generate verification codes
                </Text>
              </div>
              <Badge color="success" appearance="tint">Enabled</Badge>
            </div>
            <Divider className="my-m" />
            <div className="flex items-center justify-between">
              <div>
                <Text className="text-300 text-neutral-foreground-1 block">
                  SMS Recovery
                </Text>
                <Text className="text-200 text-neutral-foreground-3 block">
                  Use your phone number as a backup 2FA method
                </Text>
              </div>
              <Button appearance="outline" size="small">
                Set up
              </Button>
            </div>
          </Card>

          <Card className="p-l">
            <Text className="text-400 leading-400 font-semibold text-neutral-foreground-1 mb-m block">
              Active Sessions
            </Text>
            <div className="space-y-m">
              {[
                { device: 'Windows PC - Chrome', location: 'Berlin, Germany', current: true, time: 'Now' },
                { device: 'iPhone 15 - Safari', location: 'Berlin, Germany', current: false, time: '2 hours ago' },
                { device: 'MacBook Pro - Firefox', location: 'Munich, Germany', current: false, time: '1 day ago' },
              ].map((session) => (
                <div key={session.device} className="flex items-center justify-between py-xs">
                  <div>
                    <div className="flex items-center gap-s">
                      <Text className="text-300 font-medium text-neutral-foreground-1">
                        {session.device}
                      </Text>
                      {session.current && (
                        <Badge color="success" appearance="filled" size="small">
                          Current
                        </Badge>
                      )}
                    </div>
                    <Text className="text-200 text-neutral-foreground-3">
                      {session.location} · {session.time}
                    </Text>
                  </div>
                  {!session.current && (
                    <Button appearance="subtle" size="small">
                      <LogOut size={14} className="mr-xxs" /> Revoke
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === 'appearance' && (
        <Card className="p-l">
          <Text className="text-400 leading-400 font-semibold text-neutral-foreground-1 mb-l block">
            Appearance Settings
          </Text>
          <div className="space-y-l">
            <Field label="Theme">
              <RadioGroup defaultValue="system">
                <Radio value="light" label="Light" />
                <Radio value="dark" label="Dark" />
                <Radio value="system" label="System default" />
              </RadioGroup>
            </Field>
            <Divider />
            <div className="flex items-center justify-between">
              <div>
                <Text className="text-300 font-medium text-neutral-foreground-1 block">
                  Compact Mode
                </Text>
                <Text className="text-200 text-neutral-foreground-3 block">
                  Reduce spacing and padding throughout the interface
                </Text>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Text className="text-300 font-medium text-neutral-foreground-1 block">
                  Animations
                </Text>
                <Text className="text-200 text-neutral-foreground-3 block">
                  Enable motion and transitions in the interface
                </Text>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
          <Divider className="my-m" />
          <div className="flex justify-end">
            <Button appearance="primary" onClick={handleSave}>
              <Save size={14} className="mr-xxs" /> Save Preferences
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
