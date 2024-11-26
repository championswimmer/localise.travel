import React, {useMemo, useState} from 'react';
import {Select, SelectProps} from 'tamagui';
import {ChevronDown} from "@tamagui/lucide-icons";
import {languages} from "../data/languages";

export function LanguageSelector(props: SelectProps) {
    const langCodes = useMemo(() => Object.keys(languages), [languages]);
    const [lang, setLang] = useState('fr');
    return (
        <Select defaultValue={lang} onValueChange={setLang}>
            <Select.Trigger marginHorizontal={12} width={100} iconAfter={ChevronDown}>
                <Select.Value>{languages[lang].flag} {languages[lang].code}</Select.Value>
            </Select.Trigger>

            <Select.Adapt when="sm" platform="touch">
                {/* or <Select.Sheet> */}
                <Select.Sheet dismissOnSnapToBottom modal>
                    <Select.Sheet.Frame>
                        <Select.Adapt.Contents/>
                    </Select.Sheet.Frame>
                    <Select.Sheet.Overlay/>
                </Select.Sheet>
            </Select.Adapt>

            <Select.Content>
                <Select.ScrollUpButton/>
                <Select.Viewport>
                    <Select.Group>
                        <Select.Label fontFamily="$heading">Select Language</Select.Label>
                        {useMemo(() => (
                            langCodes.map(function (lang, idx)  {
                                const l = languages[lang];
                                return (
                                    <Select.Item index={idx} value={l.code} key={l.code}>
                                        <Select.ItemText>{l.flag} {l.name} ({l.name_eng})</Select.ItemText>
                                    </Select.Item>
                                )
                            })
                        ), [langCodes])}
                    </Select.Group>
                </Select.Viewport>
                <Select.ScrollDownButton/>
            </Select.Content>
        </Select>

    );
}