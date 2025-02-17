import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { SettingsSection } from "./SettingsLayout"

interface AppearanceSettingsProps {
  isDarkMode: boolean
  isHighContrast: boolean
  onDarkModeChange: (value: boolean) => void
  onHighContrastChange: (value: boolean) => void
}

export function AppearanceSettings({
  isDarkMode,
  isHighContrast,
  onDarkModeChange,
  onHighContrastChange,
}: AppearanceSettingsProps) {
  return (
    <SettingsSection
      title="Appearance"
      description="Customize the look and feel of the application"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="darkMode">Dark Mode</Label>
          <Switch
            id="darkMode"
            checked={isDarkMode}
            onCheckedChange={onDarkModeChange}
          />
        </div>
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="highContrast">High Contrast</Label>
          <Switch
            id="highContrast"
            checked={isHighContrast}
            onCheckedChange={onHighContrastChange}
          />
        </div>
      </div>
    </SettingsSection>
  )
}