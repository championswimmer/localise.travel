import { Button, Text, XStack, YStack } from "tamagui";
import { Globe2 } from "@tamagui/lucide-icons"

export default function AppBar() {
  return (
    <XStack padding="$2">
      <Globe2 size="$1" margin="$2" color="$blue10" />
      <Text color="$blue10" margin="$2">localise.travel</Text>
      {/* Button on the right (Select with marginLeft=auto) */}
      
    </XStack>
  )
}