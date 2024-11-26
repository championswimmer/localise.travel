import {Globe2} from "@tamagui/lucide-icons";
import {Button, Text, View, XStack} from "tamagui";
import {LanguageSelector} from "./LanguageSelector";

export function LocaliseLogo() {
    return (
        <XStack alignItems={"center"}>
            <Globe2 marginHorizontal={12} size={20} color="$blue9"></Globe2>
            <Text fontFamily="$heading" fontSize={20}>localise.travel</Text>
        </XStack>
    )
}