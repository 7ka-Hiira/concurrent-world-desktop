import { Autocomplete, Box, InputBase, ListItem, ListItemIcon, ListItemText, type SxProps } from '@mui/material'
import { type User } from '@concurrent-world/client'
import { useClient } from '../../context/ClientContext'
import { CCUserChip } from './CCUserChip'
import { CCAvatar } from './CCAvatar'

export interface UserPickerProps {
    selected: User[]
    setSelected: (selected: User[]) => void
    sx?: SxProps
}

export const UserPicker = (props: UserPickerProps): JSX.Element => {
    const { client } = useClient()

    return (
        <Box
            sx={{
                ...props.sx,
                borderRadius: 2,
                padding: '0px 10px',
                flex: '1',
                backgroundColor: 'background.paper'
            }}
        >
            <Autocomplete
                filterSelectedOptions
                sx={{ width: 1 }}
                multiple
                value={props.selected}
                options={client.ackings ?? []}
                getOptionKey={(option: User) => option.ccid}
                getOptionLabel={(option: User) => option.profile?.payload.body.username ?? ''}
                isOptionEqualToValue={(option, value) => option.ccid === value.ccid}
                onChange={(_, value) => {
                    props.setSelected(value)
                }}
                renderInput={(params) => {
                    const { InputLabelProps, InputProps, ...rest } = params
                    return (
                        <InputBase
                            {...params.InputProps}
                            {...rest}
                            sx={{ color: 'props.theme.palette.text.secondary' }}
                            placeholder={props.selected.length === 0 ? 'ユーザーの選択…' : ''}
                        />
                    )
                }}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <CCUserChip user={option} {...getTagProps({ index })} key={option.ccid} />
                    ))
                }
                renderOption={(props, option, state) => (
                    <ListItem {...props}>
                        <ListItemIcon>
                            <CCAvatar avatarURL={option.profile?.payload.body.avatar} identiconSource={option.ccid} />
                        </ListItemIcon>
                        <ListItemText primary={option.profile?.payload.body.username} secondary={option.ccid} />
                    </ListItem>
                )}
            />
        </Box>
    )
}
