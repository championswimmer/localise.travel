import {Button, SelectIcon, Text, View, XStack, YStack} from "tamagui";
import {Globe} from "@tamagui/lucide-icons";
import LocaliseLogo from "../components/LocaliseLogo";
import LanguageSelector from "../components/LanguageSelector";

export default function LocaliseTravel() {
    return (
        <YStack>
            <XStack>
                <LocaliseLogo/>
                <LanguageSelector id="lang-select-1"/>
            </XStack>
        </YStack>
    );
}
