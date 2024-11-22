import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Grid,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    TextField,
    Typography
} from '@mui/material'
import { ProfileEditor } from '../ProfileEditor'
import { useClient } from '../../context/ClientContext'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'
import {
    type ProfileSchema,
    type CoreProfile,
    type Schema,
    type BadgeRef,
    type CoreTimeline,
    Schemas,
    type SubprofileTimelineSchema,
    type EmptyTimelineSchema,
    type Timeline,
    type User
} from '@concurrent-world/client'
import { useEffect, useState } from 'react'
import { CCDrawer } from '../ui/CCDrawer'
import { CCEditor } from '../ui/cceditor'
import { SubProfileCard } from '../SubProfileCard'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import PublishIcon from '@mui/icons-material/Publish'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import EditIcon from '@mui/icons-material/Edit'
import { useLocation } from 'react-router-dom'
import { type Badge } from '../../model'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { usePreference } from '../../context/PreferenceContext'
import { useConcord } from '../../context/ConcordContext'
import MedicationIcon from '@mui/icons-material/Medication'
import { useConfirm } from '../../context/Confirm'
import { CCUserChip } from '../ui/CCUserChip'
import { UserPicker } from '../ui/UserPicker'

export const ProfileSettings = (): JSX.Element => {
    const { client } = useClient()
    const concord = useConcord()
    const { enqueueSnackbar } = useSnackbar()
    const [enableConcord] = usePreference('enableConcord')
    const confirm = useConfirm()

    const { t } = useTranslation('', { keyPrefix: 'settings.profile' })

    const path = useLocation()
    const hash = path.hash.replace('#', '')

    const [allProfiles, setAllProfiles] = useState<Array<CoreProfile<any>>>([])
    const [allEnabledTimelines, setAllEnabledTimelines] = useState<Array<CoreTimeline<any>>>([])
    const [openProfileEditor, setOpenProfileEditor] = useState(false)
    const [openReaderEditor, setOpenReaderEditor] = useState<((_: User[]) => void) | null>(null)

    const [schemaURLDraft, setSchemaURLDraft] = useState<string>('https://schema.concrnt.world/p/basic.json')
    const [schemaURL, setSchemaURL] = useState<any>(null)
    const [editingProfile, setEditingProfile] = useState<CoreProfile<any> | null>(null)

    const [latestProfile, setLatestProfile] = useState<ProfileSchema | null | undefined>(client.user?.profile)

    const [subprofileDraft, setSubprofileDraft] = useState<any>(null)
    const [badges, setBadges] = useState<Badge[]>([])

    const [homeTimeline, setHomeTimeline] = useState<Timeline<EmptyTimelineSchema> | null>(null)
    const homeIsPublic = homeTimeline?.policyParams?.isReadPublic

    const [update, setUpdate] = useState(0)

    const [selectedUsers, setSelectedUsers] = useState<User[]>([])

    const load = (): void => {
        setUpdate((prev) => prev + 1)
    }

    useEffect(() => {
        for (const profile of allProfiles) {
            client.api.getTimeline('world.concrnt.t-subhome.' + profile.id + '@' + client.ccid!).then((timeline) => {
                if (!timeline) return
                setAllEnabledTimelines((prev) => {
                    if (prev.find((t) => t.id === timeline.id)) {
                        return prev
                    }
                    return [...prev, timeline]
                })
            })
        }
    }, [allProfiles])

    useEffect(() => {
        if (!client?.ccid) return
        if (!client.user?.profile) return

        client.api.getProfileBySemanticID<ProfileSchema>('world.concrnt.p', client.ccid).then((profile) => {
            setLatestProfile(profile?.document.body)
            client.api.getProfiles({ author: client.ccid }).then((profiles) => {
                const subprofiles = (profiles ?? []).filter((p) => p.id !== profile?.id)
                setAllProfiles(subprofiles)
            })
        })

        client.getTimeline<EmptyTimelineSchema>(client.user.homeTimeline).then((timeline) => {
            setHomeTimeline(timeline)
        })

        concord.getBadges(client.ccid).then((badges) => {
            setBadges(badges)
        })
    }, [client, update])

    const enabledSubprofiles = latestProfile?.subprofiles ?? []

    useEffect(() => {
        let isMounted = true
        const timer = setTimeout(() => {
            if (isMounted) {
                setSchemaURL(schemaURLDraft)
            }
        }, 300)
        return () => {
            isMounted = false
            clearTimeout(timer)
        }
    }, [schemaURLDraft])

    useEffect(() => {
        if (hash) {
            setSchemaURLDraft(hash)
            setOpenProfileEditor(true)
        }
    }, [hash])

    const [badgeMenuAnchor, setBadgeMenuAnchor] = useState<null | HTMLElement>(null)
    const [selectedBadge, setSelectedBadge] = useState<null | Badge>(null)
    const [badgeAction, setBadgeAction] = useState<null | 'publish' | 'unpublish'>(null)

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1
            }}
        >
            <Typography variant="h3">{t('title')}</Typography>
            <Box
                sx={{
                    width: '100%',
                    borderRadius: 1,
                    overflow: 'hidden',
                    mb: 1
                }}
            >
                <ProfileEditor
                    id={''}
                    initial={client?.user?.profile}
                    onSubmit={() => {
                        enqueueSnackbar(t('updated'), { variant: 'success' })
                    }}
                />
            </Box>

            {homeIsPublic ? (
                <Alert
                    severity="info"
                    action={
                        <Button
                            variant="text"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                confirm.open(
                                    'ホーム投稿の閲覧者を制限しますか？',
                                    () => {
                                        if (!homeTimeline) return
                                        const currentPolicy = homeTimeline.policyParams
                                        currentPolicy.isReadPublic = false
                                        client.api
                                            .upsertTimeline(
                                                Schemas.emptyTimeline,
                                                {},
                                                {
                                                    semanticID: 'world.concrnt.t-home',
                                                    indexable: false,
                                                    policy: 'https://policy.concrnt.world/t/inline-read-write.json',
                                                    policyParams: JSON.stringify(currentPolicy)
                                                }
                                            )
                                            .then(() => {
                                                client.api.invalidateTimeline('world.concrnt.t-home@' + client.ccid!)
                                                load()
                                            })
                                    },
                                    {
                                        description:
                                            '制限するとホームに投稿された内容は、個別に指定したユーザーのみが閲覧できるようになります。'
                                    }
                                )
                            }}
                        >
                            閲覧できる人を制限する
                        </Button>
                    }
                >
                    <AlertTitle>ホーム投稿は一般公開に設定されています</AlertTitle>
                    制限付きのタイムラインへの投稿を除いた投稿がだれでも閲覧可能です。
                </Alert>
            ) : (
                <Alert
                    severity="info"
                    action={
                        <Button
                            variant="text"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                confirm.open(
                                    'ホーム投稿を一般公開にしますか？',
                                    () => {
                                        if (!homeTimeline) return
                                        const currentPolicy = homeTimeline.policyParams
                                        currentPolicy.isReadPublic = true
                                        client.api
                                            .upsertTimeline(
                                                Schemas.emptyTimeline,
                                                {},
                                                {
                                                    semanticID: 'world.concrnt.t-home',
                                                    indexable: false,
                                                    policy: 'https://policy.concrnt.world/t/inline-read-write.json',
                                                    policyParams: JSON.stringify(currentPolicy)
                                                }
                                            )
                                            .then(() => {
                                                client.api.invalidateTimeline('world.concrnt.t-home@' + client.ccid!)
                                                load()
                                            })
                                    },
                                    {
                                        description:
                                            '一般公開にすると過去の投稿も含めて全てのユーザーが閲覧できるようになります。'
                                    }
                                )
                            }}
                        >
                            一般公開にする
                        </Button>
                    }
                >
                    <AlertTitle>ホーム投稿の閲覧ユーザーを制限しています</AlertTitle>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1
                        }}
                    >
                        ホームに投稿された内容は、以下のユーザーが閲覧できます。
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 1,
                                flexWrap: 'wrap'
                            }}
                        >
                            {homeTimeline?.policyParams?.reader?.map((e: string) => (
                                <CCUserChip avatar key={e} ccid={e} />
                            ))}
                        </Box>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => {
                                if (!homeTimeline) return

                                Promise.all(
                                    homeTimeline.policyParams.reader.map((e: string) => client.getUser(e))
                                ).then((users) => {
                                    setSelectedUsers(users.filter((u) => u) as User[])
                                })

                                setOpenReaderEditor(() => (update: User[]) => {
                                    const reader = update.map((u) => u.ccid)
                                    const currentPolicy = homeTimeline.policyParams
                                    currentPolicy.reader = reader
                                    client.api
                                        .upsertTimeline(
                                            Schemas.emptyTimeline,
                                            {},
                                            {
                                                semanticID: 'world.concrnt.t-home',
                                                indexable: false,
                                                policy: 'https://policy.concrnt.world/t/inline-read-write.json',
                                                policyParams: JSON.stringify(currentPolicy)
                                            }
                                        )
                                        .then(() => {
                                            client.api.invalidateTimeline('world.concrnt.t-home@' + client.ccid!)
                                            load()
                                        })
                                })
                            }}
                        >
                            閲覧ユーザーを編集
                        </Button>
                    </Box>
                </Alert>
            )}

            {enableConcord && badges.length > 0 && (
                <>
                    <Typography variant="h3">バッジ</Typography>
                    <Box>
                        <Grid container spacing={2}>
                            {badges.map((badge) => {
                                const published = latestProfile?.badges?.find(
                                    (b) => b.badgeId === badge.badgeId && b.seriesId === badge.classId
                                )
                                return (
                                    <Grid item key={badge.badgeId}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 1,
                                                width: '80px',
                                                height: '80px',
                                                position: 'relative',
                                                cursor: 'pointer'
                                            }}
                                            onClick={(e) => {
                                                setBadgeMenuAnchor(e.currentTarget)
                                                setSelectedBadge(badge)
                                                setBadgeAction(published ? 'unpublish' : 'publish')
                                            }}
                                        >
                                            {published && (
                                                <CheckCircleIcon
                                                    sx={{
                                                        position: 'absolute',
                                                        right: 0,
                                                        bottom: 0,
                                                        color: 'primary.main',
                                                        fontSize: '2rem',
                                                        backgroundColor: 'background.paper',
                                                        borderRadius: '50%',
                                                        transform: 'translate(20%, 20%)'
                                                    }}
                                                />
                                            )}
                                            <Box
                                                component="img"
                                                src={badge.uri}
                                                alt={badge.name}
                                                sx={{
                                                    borderRadius: 1
                                                }}
                                            />
                                        </Box>
                                    </Grid>
                                )
                            })}
                        </Grid>
                        <Menu
                            anchorEl={badgeMenuAnchor}
                            open={Boolean(badgeMenuAnchor)}
                            onClose={() => {
                                setBadgeMenuAnchor(null)
                            }}
                        >
                            {badgeAction === 'publish' && (
                                <MenuItem
                                    onClick={() => {
                                        if (!latestProfile || !selectedBadge) return
                                        const newBadgeRef: BadgeRef = {
                                            badgeId: selectedBadge.badgeId,
                                            seriesId: selectedBadge.classId
                                        }
                                        const badges = [...(latestProfile.badges ?? []), newBadgeRef]
                                        client
                                            .setProfile({
                                                badges
                                            })
                                            .then((_) => {
                                                setBadgeMenuAnchor(null)
                                                load()
                                            })
                                    }}
                                >
                                    <ListItemIcon>
                                        <PublishIcon />
                                    </ListItemIcon>
                                    <ListItemText>公開する</ListItemText>
                                </MenuItem>
                            )}
                            {badgeAction === 'unpublish' && (
                                <MenuItem
                                    onClick={() => {
                                        if (!latestProfile || !selectedBadge) return
                                        const badges = (latestProfile.badges ?? []).filter(
                                            (b) =>
                                                b.badgeId !== selectedBadge.badgeId ||
                                                b.seriesId !== selectedBadge.classId
                                        )
                                        client
                                            .setProfile({
                                                badges
                                            })
                                            .then((_) => {
                                                setBadgeMenuAnchor(null)
                                                load()
                                            })
                                    }}
                                >
                                    <ListItemIcon>
                                        <VisibilityOffIcon />
                                    </ListItemIcon>
                                    <ListItemText>非公開にする</ListItemText>
                                </MenuItem>
                            )}
                            <MenuItem
                                onClick={() => {
                                    if (!selectedBadge) return
                                    concord.inspectBadge({
                                        seriesId: selectedBadge.classId,
                                        badgeId: selectedBadge.badgeId
                                    })
                                    setBadgeMenuAnchor(null)
                                }}
                            >
                                <ListItemIcon>
                                    <ManageSearchIcon />
                                </ListItemIcon>
                                <ListItemText>詳細</ListItemText>
                            </MenuItem>
                        </Menu>
                    </Box>
                </>
            )}

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <Typography variant="h3">サブプロフィール</Typography>
                <Button
                    onClick={() => {
                        setSubprofileDraft({})
                        setOpenProfileEditor(true)
                    }}
                >
                    新規
                </Button>
            </Box>
            {allProfiles.map((character) => {
                const published = enabledSubprofiles.includes(character.id)
                const withTimeline = allEnabledTimelines.find((t) => t.document.body.subprofile === character.id)
                let policyParams: any = {}
                try {
                    if (withTimeline?.document.policyParams) {
                        policyParams = JSON.parse(withTimeline.document.policyParams)
                    }
                } catch (e) {
                    console.error(e)
                }
                const timelineValid =
                    withTimeline &&
                    withTimeline.document.policy === 'https://policy.concrnt.world/t/inline-read-write.json' &&
                    policyParams.isWritePublic === false &&
                    policyParams.isReadPublic === true &&
                    policyParams.writer.includes(client.ccid)

                const menuItems = [
                    <MenuItem
                        key="publish"
                        onClick={() => {
                            let subprofiles
                            if (published) {
                                subprofiles = enabledSubprofiles.filter((id) => id !== character.id)
                            } else {
                                subprofiles = [...enabledSubprofiles, character.id]
                            }

                            client
                                .setProfile({
                                    subprofiles
                                })
                                .then((_) => {
                                    load()
                                })
                        }}
                    >
                        <ListItemIcon>
                            {published ? (
                                <VisibilityOffIcon sx={{ color: 'text.primary' }} />
                            ) : (
                                <PublishIcon sx={{ color: 'text.primary' }} />
                            )}
                        </ListItemIcon>
                        <ListItemText>{published ? <>非公開にする</> : <>公開する</>}</ListItemText>
                    </MenuItem>,
                    <MenuItem
                        key="edit"
                        onClick={() => {
                            setSubprofileDraft(character.document.body)
                            setEditingProfile(character)
                            setSchemaURL(character.schema)
                            setSchemaURLDraft(character.schema)
                        }}
                    >
                        <ListItemIcon>
                            <EditIcon sx={{ color: 'text.primary' }} />
                        </ListItemIcon>
                        <ListItemText>編集</ListItemText>
                    </MenuItem>,
                    <MenuItem
                        key="delete"
                        disabled={published}
                        onClick={() => {
                            confirm.open(
                                'サブプロフィールを削除しますか？',
                                () => {
                                    client.api.deleteProfile(character.id).then((_) => {
                                        load()
                                    })
                                },
                                { confirmText: '削除' }
                            )
                        }}
                    >
                        <ListItemIcon>
                            <DeleteForeverIcon sx={{ color: 'error.main' }} />
                        </ListItemIcon>
                        <ListItemText>{published ? <>削除するには非公開にしてください</> : <>削除</>}</ListItemText>
                    </MenuItem>
                ]

                if (!withTimeline || !timelineValid) {
                    menuItems.push(
                        <MenuItem
                            key="fix"
                            onClick={() => {
                                client.api
                                    .upsertTimeline<SubprofileTimelineSchema>(
                                        Schemas.subprofileTimeline,
                                        {
                                            subprofile: character.id
                                        },
                                        {
                                            owner: client.ccid,
                                            indexable: false,
                                            policy: 'https://policy.concrnt.world/t/inline-read-write.json',
                                            policyParams: `{"isWritePublic": false, "isReadPublic": true, "writer": ["${client.ccid}"], "reader": []}`,
                                            semanticID: 'world.concrnt.t-subhome.' + character.id
                                        }
                                    )
                                    .then((_) => {
                                        client.api.invalidateTimeline(
                                            'world.concrnt.t-subhome.' + character.id + '@' + client.ccid!
                                        )
                                        enqueueSnackbar('サブプロフィールタイムラインを修正しました', {
                                            variant: 'success'
                                        })
                                        load()
                                    })
                            }}
                        >
                            <ListItemIcon>
                                <MedicationIcon sx={{ color: 'text.primary' }} />
                            </ListItemIcon>
                            <ListItemText>サブプロフィールタイムラインを修正</ListItemText>
                        </MenuItem>
                    )
                }

                return (
                    <SubProfileCard key={character.id} character={character} additionalMenuItems={menuItems}>
                        {published ? <>掲載中</> : <>未掲載</>}
                        {withTimeline ? (
                            <></>
                        ) : (
                            <>
                                <br />
                                サブプロフィールタイムラインがありません
                            </>
                        )}
                        {timelineValid ? (
                            <></>
                        ) : (
                            <>
                                <br />
                                サブプロフィールタイムラインの設定が不完全です
                            </>
                        )}
                    </SubProfileCard>
                )
            })}
            <CCDrawer
                open={openProfileEditor || editingProfile !== null}
                onClose={() => {
                    setOpenProfileEditor(false)
                    setEditingProfile(null)
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '30px',
                        p: 3
                    }}
                >
                    {openProfileEditor && (
                        <>
                            <Typography variant="h3">新規サブプロフィール</Typography>
                            <TextField
                                label="テンプレートのURL"
                                value={schemaURLDraft}
                                onChange={(e) => {
                                    setSchemaURLDraft(e.target.value)
                                }}
                            />
                            <CCEditor schemaURL={schemaURL} value={subprofileDraft} setValue={setSubprofileDraft} />
                            <Button
                                onClick={() => {
                                    client.api
                                        .upsertProfile(schemaURL as Schema, subprofileDraft, {})
                                        .then((profile) => {
                                            client.api
                                                .upsertTimeline<SubprofileTimelineSchema>(
                                                    Schemas.subprofileTimeline,
                                                    {
                                                        subprofile: profile.id
                                                    },
                                                    {
                                                        semanticID: 'world.concrnt.t-subhome.' + profile.id
                                                    }
                                                )
                                                .then((_) => {
                                                    setOpenProfileEditor(false)
                                                    load()
                                                })
                                        })
                                }}
                            >
                                作成
                            </Button>
                        </>
                    )}
                    {editingProfile && (
                        <>
                            <Typography variant="h3">サブプロフィールの編集</Typography>
                            <TextField
                                label="テンプレートのURL"
                                value={schemaURLDraft}
                                onChange={(e) => {
                                    setSchemaURLDraft(e.target.value)
                                }}
                            />
                            <CCEditor schemaURL={schemaURL} value={subprofileDraft} setValue={setSubprofileDraft} />
                            <Button
                                onClick={() => {
                                    client.api
                                        .upsertProfile(schemaURL, subprofileDraft, {
                                            id: editingProfile.id
                                        })
                                        .then((_) => {
                                            setEditingProfile(null)
                                            // client.api.invalidateProfileByID(editingProfile.id)
                                            load()
                                        })
                                }}
                            >
                                更新
                            </Button>
                        </>
                    )}
                </Box>
            </CCDrawer>
            <CCDrawer
                open={openReaderEditor !== null}
                onClose={() => {
                    setOpenReaderEditor(null)
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '30px',
                        p: 3
                    }}
                >
                    <Typography variant="h3">閲覧ユーザーの編集</Typography>
                    <UserPicker selected={selectedUsers} setSelected={setSelectedUsers} />
                    <Button
                        onClick={() => {
                            openReaderEditor?.(selectedUsers)
                            setOpenReaderEditor(null)
                        }}
                    >
                        更新
                    </Button>
                </Box>
            </CCDrawer>
        </Box>
    )
}
