import React, {useState} from 'react';
import {Adapt, FontSizeTokens, getFontSize, Select, SelectProps, Sheet, YStack} from 'tamagui';
import {AppSettings} from '../state/app-settings';
import {Language} from "../data/languages";
import {Check, ChevronDown, ChevronUp} from "@tamagui/lucide-icons";
import {LinearGradient} from "@tamagui/linear-gradient";

function LanguageSelector(props: SelectProps) {
    const [val, setVal] = useState('en');

    const languages: Language[] = [
        // French
        {name: 'Français', name_eng: 'French', code: 'fr', flag: '🇫🇷'},
        // Spanish
        {name: 'Español', name_eng: 'Spanish', code: 'es', flag: '🇪🇸'},
        // German
        {name: 'Deutsch', name_eng: 'German', code: 'de', flag: '🇩🇪'},
        // Italian
        {name: 'Italiano', name_eng: 'Italian', code: 'it', flag: '🇮🇹'},
        // Portuguese
        {name: 'Português', name_eng: 'Portuguese', code: 'pt', flag: '🇵🇹'},
        // Hindi
        {name: 'हिन्दी', name_eng: 'Hindi', code: 'hi', flag: '🇮🇳'},
        // Bengali
        {name: 'বাংলা', name_eng: 'Bengali', code: 'bn', flag: '🇧🇩'},
        // Chinese
        {name: '中文', name_eng: 'Chinese', code: 'zh', flag: '🇨🇳'},
        // Japanese
        {name: '日本語', name_eng: 'Japanese', code: 'ja', flag: '🇯🇵'},
        // Arabic
        {name: 'عربى', name_eng: 'Arabic', code: 'ar', flag: '🇸🇦'},
    ];


    return (
        <Select value={val} onValueChange={setVal} disablePreventBodyScroll {...props}>
            <Select.Trigger iconAfter={ChevronDown}>
                <Select.Value placeholder="Something"/>
            </Select.Trigger>

            <Adapt when="sm" platform="touch">
                <Sheet
                    native={!!props.native}
                    modal
                    dismissOnSnapToBottom
                    animationConfig={{
                        type: 'spring',
                        damping: 20,
                        mass: 1.2,
                        stiffness: 250,
                    }}
                >
                    <Sheet.Frame>
                        <Sheet.ScrollView>
                            <Adapt.Contents/>
                        </Sheet.ScrollView>
                    </Sheet.Frame>
                    <Sheet.Overlay
                        animation="lazy"
                        enterStyle={{opacity: 0}}
                        exitStyle={{opacity: 0}}
                    />
                </Sheet>
            </Adapt>

            <Select.Content zIndex={200000}>
                <Select.ScrollUpButton
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                    width="100%"
                    height="$3"
                >
                    <YStack zIndex={10}>
                        <ChevronUp size={20}/>
                    </YStack>
                    <LinearGradient
                        start={[0, 0]}
                        end={[0, 1]}
                        fullscreen
                        colors={['$background', 'transparent']}
                        borderRadius="$4"
                    />
                </Select.ScrollUpButton>

                <Select.Viewport
                    // to do animations:
                    // animation="quick"
                    // animateOnly={['transform', 'opacity']}
                    // enterStyle={{ o: 0, y: -10 }}
                    // exitStyle={{ o: 0, y: 10 }}
                    minWidth={200}
                >
                    <Select.Group>
                        <Select.Label>Language</Select.Label>
                        {/* for longer lists memoizing these is useful */}
                        {languages.map((item, i) => {
                            return (
                                <Select.Item
                                    index={i}
                                    key={item.code}
                                    value={item.name.toLowerCase()}
                                >
                                    <Select.ItemText>{item.flag} {item.name}</Select.ItemText>
                                    <Select.ItemIndicator marginLeft="auto">
                                        <Check size={16}/>
                                    </Select.ItemIndicator>
                                </Select.Item>
                            )
                        })}
                    </Select.Group>
                    {/* Native gets an extra icon */}
                    {props.native && (
                        <YStack
                            position="absolute"
                            right={0}
                            top={0}
                            bottom={0}
                            alignItems="center"
                            justifyContent="center"
                            width={'$4'}
                            pointerEvents="none"
                        >
                            <ChevronDown
                                size={getFontSize((props.size as FontSizeTokens) ?? '$true')}
                            />
                        </YStack>
                    )}
                </Select.Viewport>

                <Select.ScrollDownButton
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                    width="100%"
                    height="$3"
                >
                    <YStack zIndex={10}>
                        <ChevronDown size={20}/>
                    </YStack>
                    <LinearGradient
                        start={[0, 0]}
                        end={[0, 1]}
                        fullscreen
                        colors={['transparent', '$background']}
                        borderRadius="$4"
                    />
                </Select.ScrollDownButton>
            </Select.Content>
        </Select>

    );
};

export default LanguageSelector;