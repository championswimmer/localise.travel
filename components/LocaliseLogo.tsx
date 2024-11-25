import {Button, Text, XStack} from "tamagui";
import {Globe} from "@tamagui/lucide-icons";

export default function LocaliseLogo() {
    return (<Button
        size="$6"
        icon={<Globe color="$blue10"/>}
        disabled={true}
        chromeless
    >
        localise.travel
    </Button>)
}