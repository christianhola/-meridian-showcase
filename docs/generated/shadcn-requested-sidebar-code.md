# Código completo por componente y área — shadcn/ui

Recorrido solicitado en el orden de la barra lateral. Cada sección conserva el nombre del área, su URL oficial y los bloques de código encontrados en sus ejemplos y secciones inferiores.

## Direction

Fuente: https://ui.shadcn.com/docs/components/direction


### View code 1

```tsx
<html dir="rtl">
  <body>
    <DirectionProvider direction="rtl">
      {/* Your app content */}
    </DirectionProvider>
  </body>
</html>
```

### View code 2

```tsx
import { useDirection } from "@/components/ui/direction"

function MyComponent() {
  const direction = useDirection()
  return <div>Current direction: {direction}</div>
}
```

### View code 3

```tsx
"use client"

export {
  DirectionProvider,
  useDirection,
} from "@base-ui/react/direction-provider"
```
## Drawer

Fuente: https://ui.shadcn.com/docs/components/drawer


### View code 1

```tsx
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
```

### View code 2

```tsx
<Drawer>
  <DrawerTrigger render={<Button variant="outline" />}>Open</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Are you absolutely sure?</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
    </DrawerHeader>
    <div className="p-4">{/* Content here */}</div>
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

### View code 3

```tsx
<DrawerContent className="h-[50vh]">
```

### View code 4

```tsx
<DrawerContent className="w-96">
```

### View code 5

```tsx
<DrawerContent className="data-[swipe-axis=y]:max-h-[50vh] data-[swipe-axis=x]:w-96">
```

### View code 6

```tsx
<DrawerContent>
  <DrawerHeader>...</DrawerHeader>
  <div className="flex-1 overflow-y-auto p-4">{/* Scrollable content */}</div>
  <DrawerFooter>...</DrawerFooter>
</DrawerContent>
```

### View code 7

```tsx
<Drawer
    snapPoints={[0.25, 0.5, 1]}
-   activeSnapPoint={snapPoint}
-   setActiveSnapPoint={setSnapPoint}
-   snapToSequentialPoint
+   snapPoint={snapPoint}
+   onSnapPointChange={setSnapPoint}
+   snapToSequentialPoints
  >
```

### View code 8

```tsx
"use client"

import * as React from "react"
```

### View code 9

```tsx
import { Button } from "@/components/ui/button"
import {
  Drawer,
```

### View code 10

```tsx
"use client"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export function DrawerSwipeHandle() {
  return (
    <Drawer showSwipeHandle>
      <DrawerTrigger render={<Button variant="secondary">Open Drawer</Button>} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer</DrawerTitle>
          <DrawerDescription>Drawer with a swipe handle.</DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 p-4">
          <div className="rounded-2xl bg-muted group-data-[swipe-axis=x]/drawer-popup:size-full group-data-[swipe-axis=y]/drawer-popup:h-80 group-data-[swipe-axis=y]/drawer-popup:w-full" />
        </div>
        <DrawerFooter>
          <DrawerClose render={<Button>Close</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
```

### View code 11

```tsx
"use client"

import { useIsMobile } from "@/hooks/use-mobile"
```

### View code 12

```tsx
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export function DrawerNonModal() {
  return (
    <Drawer modal={false} disablePointerDismissal swipeDirection="right">
      <DrawerTrigger render={<Button variant="outline">Non Modal</Button>} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Non Modal Drawer</DrawerTitle>
        </DrawerHeader>
        <div className="flex-1 p-4">
          <div className="rounded-2xl bg-muted group-data-[swipe-axis=x]/drawer-popup:size-full group-data-[swipe-axis=y]/drawer-popup:h-80 group-data-[swipe-axis=y]/drawer-popup:w-full" />
        </div>
        <DrawerFooter>
          <DrawerClose render={<Button>Close</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
```

### View code 13

```tsx
"use client"

import { Button } from "@/components/ui/button"
```
## Dropdown Menu

Fuente: https://ui.shadcn.com/docs/components/dropdown-menu


### View code 1

```tsx
<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" />}>
    Open
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuGroup>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Billing</DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem>Team</DropdownMenuItem>
      <DropdownMenuItem>Subscription</DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
```

### View code 2

```tsx
"use client"

import { Button } from "@/components/ui/button"
```

### View code 3

```tsx
"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropdownMenuBasic() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline">Open</Button>} />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

### View code 4

```tsx
"use client"

import {
```

### View code 5

```tsx
"use client"

import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropdownMenuIcons() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline">Open</Button>} />
      <DropdownMenuContent>
        <DropdownMenuItem>
          <UserIcon />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCardIcon />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

### View code 6

```tsx
"use client"

import * as React from "react"
```

### View code 7

```tsx
"use client"

import { PencilIcon, ShareIcon, TrashIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropdownMenuDestructive() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline">Actions</Button>} />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <PencilIcon />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ShareIcon />
            Share
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive">
            <TrashIcon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

### View code 8

```tsx
"use client"

import { PencilIcon, ShareIcon, TrashIcon } from "lucide-react"
```
## Empty

Fuente: https://ui.shadcn.com/docs/components/empty


### View code 1

```tsx
<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <Icon />
    </EmptyMedia>
    <EmptyTitle>No data</EmptyTitle>
    <EmptyDescription>No data found</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>Add data</Button>
  </EmptyContent>
</Empty>
```

### View code 2

```tsx
<Empty>
  <EmptyHeader />
  <EmptyContent />
</Empty>
```

### View code 3

```tsx
<EmptyHeader>
  <EmptyMedia />
  <EmptyTitle />
  <EmptyDescription />
</EmptyHeader>
```

### View code 4

```tsx
<EmptyMedia variant="icon">
  <Icon />
</EmptyMedia>
```

### View code 5

```tsx
<EmptyMedia>
  <Avatar>
    <AvatarImage src="..." />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
</EmptyMedia>
```

### View code 6

```tsx
<EmptyTitle>No data</EmptyTitle>
```

### View code 7

```tsx
<EmptyDescription>You do not have any notifications.</EmptyDescription>
```

### View code 8

```tsx
<EmptyContent>
  <Button>Add Project</Button>
</EmptyContent>
```

### View code 9

```tsx
import { IconFolderCode } from "@tabler/icons-react"
import { ArrowUpRightIcon } from "lucide-react"
```

### View code 10

```tsx
import { IconCloud } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function EmptyOutline() {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconCloud />
        </EmptyMedia>
        <EmptyTitle>Cloud Storage Empty</EmptyTitle>
        <EmptyDescription>
          Upload files to your cloud storage to access them anywhere.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          Upload Files
        </Button>
      </EmptyContent>
    </Empty>
  )
}
```

### View code 11

```tsx
import { IconCloud } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
```

### View code 12

```tsx
import { IconBell } from "@tabler/icons-react"
import { RefreshCcwIcon } from "lucide-react"
```

### View code 13

```tsx
import { IconBell } from "@tabler/icons-react"
import { RefreshCcwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function EmptyMuted() {
  return (
    <Empty className="h-full bg-muted/30">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconBell />
        </EmptyMedia>
        <EmptyTitle>No Notifications</EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">
          You're all caught up. New notifications will appear here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline">
          <RefreshCcwIcon data-icon="inline-start" />
          Refresh
        </Button>
      </EmptyContent>
    </Empty>
  )
}
```

### View code 14

```tsx
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function EmptyAvatar() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="default">
          <Avatar className="size-12">
            <AvatarImage
              src="https://github.com/shadcn.png"
              className="grayscale"
            />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
        </EmptyMedia>
        <EmptyTitle>User Offline</EmptyTitle>
        <EmptyDescription>
          This user is currently offline. You can leave a message to notify them
          or try again later.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">Leave Message</Button>
      </EmptyContent>
    </Empty>
  )
}
```

### View code 15

```tsx
import {
  Avatar,
  AvatarFallback,
```

### View code 16

```tsx
import { PlusIcon } from "lucide-react"

import {
```

### View code 17

```tsx
import { SearchIcon } from "lucide-react"

import {
```

### View code 18

```tsx
"use client"

import * as React from "react"
```
## Field

Fuente: https://ui.shadcn.com/docs/components/field


### View code 1

```tsx
<FieldSet>
  <FieldLegend>Profile</FieldLegend>
  <FieldDescription>This appears on invoices and emails.</FieldDescription>
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="name">Full name</FieldLabel>
      <Input id="name" autoComplete="off" placeholder="Evil Rabbit" />
      <FieldDescription>This appears on invoices and emails.</FieldDescription>
    </Field>
    <Field>
      <FieldLabel htmlFor="username">Username</FieldLabel>
      <Input id="username" autoComplete="off" aria-invalid />
      <FieldError>Choose another username.</FieldError>
    </Field>
    <Field orientation="horizontal">
      <Switch id="newsletter" />
      <FieldLabel htmlFor="newsletter">Subscribe to the newsletter</FieldLabel>
    </Field>
  </FieldGroup>
</FieldSet>
```

### View code 2

```tsx
<Field>
  <FieldLabel htmlFor="input-id">Label</FieldLabel>
  {/* Input, Select, Switch, etc. */}
  <FieldDescription>Optional helper text.</FieldDescription>
  <FieldError>Validation message.</FieldError>
</Field>
```

### View code 3

```tsx
<Field data-invalid>
  <FieldLabel htmlFor="email">Email</FieldLabel>
  <Input id="email" type="email" aria-invalid />
  <FieldError>Enter a valid email address.</FieldError>
</Field>
```

### View code 4

```tsx
<FieldSet>
  <FieldLegend>Delivery</FieldLegend>
  <FieldGroup>{/* Fields */}</FieldGroup>
</FieldSet>
```

### View code 5

```tsx
<FieldLegend variant="label">Notification Preferences</FieldLegend>
```

### View code 6

```tsx
<FieldGroup className="@container/field-group flex flex-col gap-6">
  <Field>{/* ... */}</Field>
  <Field>{/* ... */}</Field>
</FieldGroup>
```

### View code 7

```tsx
<Field orientation="horizontal">
  <FieldLabel htmlFor="remember">Remember me</FieldLabel>
  <Switch id="remember" />
</Field>
```

### View code 8

```tsx
<Field>
  <Checkbox id="notifications" />
  <FieldContent>
    <FieldLabel htmlFor="notifications">Notifications</FieldLabel>
    <FieldDescription>Email, SMS, and push options.</FieldDescription>
  </FieldContent>
</Field>
```

### View code 9

```tsx
<FieldLabel htmlFor="email">Email</FieldLabel>
```

### View code 10

```tsx
<FieldContent>
  <FieldTitle>Enable Touch ID</FieldTitle>
  <FieldDescription>Unlock your device faster.</FieldDescription>
</FieldContent>
```

### View code 11

```tsx
<FieldDescription>We never share your email with anyone.</FieldDescription>
```

### View code 12

```tsx
<FieldSeparator>Or continue with</FieldSeparator>
```

### View code 13

```tsx
<FieldError errors={errors.username} />
```

### View code 14

```tsx
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function FieldInput() {
  return (
    <FieldSet className="w-full max-w-xs">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input id="username" type="text" placeholder="Max Leiter" />
          <FieldDescription>
            Choose a unique username for your account.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
          <Input id="password" type="password" placeholder="••••••••" />
        </Field>
      </FieldGroup>
    </FieldSet>
  )
}
```

### View code 15

```tsx
import {
  Field,
  FieldDescription,
```

### View code 16

```tsx
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

export function FieldTextarea() {
  return (
    <FieldSet className="w-full max-w-xs">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="feedback">Feedback</FieldLabel>
          <Textarea
            id="feedback"
            placeholder="Your feedback helps us improve..."
            rows={4}
          />
          <FieldDescription>
            Share your thoughts about our service.
          </FieldDescription>
        </Field>
      </FieldGroup>
    </FieldSet>
  )
}
```

### View code 17

```tsx
"use client"

import * as React from "react"

import {
  Field,
  FieldDescription,
  FieldTitle,
} from "@/components/ui/field"
import { Slider } from "@/components/ui/slider"

export function FieldSlider() {
  const [value, setValue] = React.useState([200, 800])

  return (
    <Field className="w-full max-w-xs">
      <FieldTitle>Price Range</FieldTitle>
      <FieldDescription>
        Set your budget range ($
        <span className="font-medium tabular-nums">{value[0]}</span> -{" "}
        <span className="font-medium tabular-nums">{value[1]}</span>).
      </FieldDescription>
      <Slider
        value={value}
        onValueChange={(value) => setValue(value as [number, number])}
        max={1000}
        min={0}
        step={10}
        className="mt-2 w-full"
        aria-label="Price Range"
      />
    </Field>
  )
}
```

### View code 18

```tsx
"use client"

import * as React from "react"
```

### View code 19

```tsx
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
```

### View code 20

```tsx
import { Field, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

export function FieldSwitch() {
  return (
    <Field orientation="horizontal" className="w-fit">
      <FieldLabel htmlFor="2fa">Multi-factor authentication</FieldLabel>
      <Switch id="2fa" />
    </Field>
  )
}
```

### View code 21

```tsx
import { Field, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
```

### View code 22

```tsx
import {
  Field,
  FieldContent,
```

### View code 23

```tsx
import { Button } from "@/components/ui/button"
import {
  Field,
```
## Hover Card

Fuente: https://ui.shadcn.com/docs/components/hover-card


### View code 1

```tsx
<HoverCard>
  <HoverCardTrigger>Hover</HoverCardTrigger>
  <HoverCardContent>
    The React Framework – created and maintained by @vercel.
  </HoverCardContent>
</HoverCard>
```

### View code 2

```tsx
<HoverCard>
  <HoverCardTrigger delay={100} closeDelay={200}>
    Hover
  </HoverCardTrigger>
  <HoverCardContent>Content</HoverCardContent>
</HoverCard>
```

### View code 3

```tsx
<HoverCard>
  <HoverCardTrigger>Hover</HoverCardTrigger>
  <HoverCardContent side="top" align="start">
    Content
  </HoverCardContent>
</HoverCard>
```

### View code 4

```tsx
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger delay={10} closeDelay={100} render={<Button variant="link">Hover Here</Button>} />
      <HoverCardContent className="flex w-64 flex-col gap-0.5">
        <div className="font-semibold">@nextjs</div>
        <div>The React Framework – created and maintained by @vercel.</div>
        <div className="mt-1 text-xs text-muted-foreground">
          Joined December 2021
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
```

### View code 5

```tsx
import {
  Avatar,
  AvatarFallback,
```

### View code 6

```tsx
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

const HOVER_CARD_SIDES = ["left", "top", "bottom", "right"] as const

export function HoverCardSides() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {HOVER_CARD_SIDES.map((side) => (
        <HoverCard key={side}>
          <HoverCardTrigger delay={100} closeDelay={100} render={<Button variant="outline" className="capitalize">{side}</Button>} />
          <HoverCardContent side={side}>
            <div className="flex flex-col gap-1">
              <h4 className="font-medium">Hover Card</h4>
              <p>This hover card appears on the {side} side of the trigger.</p>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  )
}
```

### View code 7

```tsx
import { Button } from "@/components/ui/button"
import {
  HoverCard,
```

### View code 8

```tsx
"use client"

import {
```
## Input

Fuente: https://ui.shadcn.com/docs/components/input


### View code 1

```tsx
import {
  Field,
  FieldDescription,
```

### View code 2

```tsx
import { Input } from "@/components/ui/input"

export function InputBasic() {
  return <Input placeholder="Enter text" />
}
```

### View code 3

```tsx
import { Input } from "@/components/ui/input"

export function InputBasic() {
```

### View code 4

```tsx
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function InputField() {
  return (
    <Field>
      <FieldLabel htmlFor="input-field-username">Username</FieldLabel>
      <Input
        id="input-field-username"
        type="text"
        placeholder="Enter your username"
      />
      <FieldDescription>
        Choose a unique username for your account.
      </FieldDescription>
    </Field>
  )
}
```

### View code 5

```tsx
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function InputFieldgroup() {
  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
        <Input id="fieldgroup-name" placeholder="Jordan Lee" />
      </Field>
      <Field>
        <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
        <Input
          id="fieldgroup-email"
          type="email"
          placeholder="name@example.com"
        />
        <FieldDescription>
          We'll send updates to this address.
        </FieldDescription>
      </Field>
      <Field orientation="horizontal">
        <Button type="reset" variant="outline">
          Reset
        </Button>
        <Button type="submit">Submit</Button>
      </Field>
    </FieldGroup>
  )
}
```

### View code 6

```tsx
import { Button } from "@/components/ui/button"
import {
  Field,
```

### View code 7

```tsx
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function InputDisabled() {
  return (
    <Field data-disabled>
      <FieldLabel htmlFor="input-demo-disabled">Email</FieldLabel>
      <Input
        id="input-demo-disabled"
        type="email"
        placeholder="Email"
        disabled
      />
      <FieldDescription>This field is currently disabled.</FieldDescription>
    </Field>
  )
}
```

### View code 8

```tsx
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function InputInvalid() {
  return (
    <Field data-invalid>
      <FieldLabel htmlFor="input-invalid">Invalid Input</FieldLabel>
      <Input id="input-invalid" placeholder="Error" aria-invalid />
      <FieldDescription>
        This field contains validation errors.
      </FieldDescription>
    </Field>
  )
}
```

### View code 9

```tsx
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function InputFile() {
  return (
    <Field>
      <FieldLabel htmlFor="picture">Picture</FieldLabel>
      <Input id="picture" type="file" />
      <FieldDescription>Select a picture to upload.</FieldDescription>
    </Field>
  )
}
```

### View code 10

```tsx
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function InputInline() {
  return (
    <Field orientation="horizontal">
      <Input type="search" placeholder="Search..." />
      <Button>Search</Button>
    </Field>
  )
}
```

### View code 11

```tsx
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
```

### View code 12

```tsx
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function InputGrid() {
  return (
    <FieldGroup className="grid max-w-sm grid-cols-2">
      <Field>
        <FieldLabel htmlFor="first-name">First Name</FieldLabel>
        <Input id="first-name" placeholder="Jordan" />
      </Field>
      <Field>
        <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
        <Input id="last-name" placeholder="Lee" />
      </Field>
    </FieldGroup>
  )
}
```

### View code 13

```tsx
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
```

### View code 14

```tsx
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function InputRequired() {
  return (
    <Field>
      <FieldLabel htmlFor="input-required">
        Required Field <span className="text-destructive">*</span>
      </FieldLabel>
      <Input
        id="input-required"
        placeholder="This field is required"
        required
      />
      <FieldDescription>This field must be filled out.</FieldDescription>
    </Field>
  )
}
```

### View code 15

```tsx
import { Badge } from "@/components/ui/badge"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function InputBadge() {
  return (
    <Field>
      <FieldLabel htmlFor="input-badge">
        Webhook URL{" "}
        <Badge variant="secondary" className="ml-auto">
          Beta
        </Badge>
      </FieldLabel>
      <Input
        id="input-badge"
        type="url"
        placeholder="https://api.example.com/webhook"
      />
    </Field>
  )
}
```

### View code 16

```tsx
import { Badge } from "@/components/ui/badge"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
```

### View code 17

```tsx
import { InfoIcon } from "lucide-react"

import { Field, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"

export function InputInputGroup() {
  return (
    <Field>
      <FieldLabel htmlFor="input-group-url">Website URL</FieldLabel>
      <InputGroup>
        <InputGroupInput id="input-group-url" placeholder="example.com" />
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InfoIcon />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
```

### View code 18

```tsx
import { InfoIcon } from "lucide-react"

import { Field, FieldLabel } from "@/components/ui/field"
```

### View code 19

```tsx
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function InputButtonGroup() {
  return (
    <Field>
      <FieldLabel htmlFor="input-button-group">Search</FieldLabel>
      <ButtonGroup>
        <Input id="input-button-group" placeholder="Type to search..." />
        <Button variant="outline">Search</Button>
      </ButtonGroup>
    </Field>
  )
}
```

### View code 20

```tsx
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Field, FieldLabel } from "@/components/ui/field"
```

### View code 21

```tsx
"use client"

import * as React from "react"
```
## Input Group

Fuente: https://ui.shadcn.com/docs/components/input-group


### View code 1

```tsx
<InputGroup>
  <InputGroupInput placeholder="Search..." />
  <InputGroupAddon>
    <SearchIcon />
  </InputGroupAddon>
</InputGroup>
```

### View code 2

```tsx
<InputGroup>
  <InputGroupInput />
  <InputGroupAddon />
</InputGroup>
```

### View code 3

```tsx
<InputGroupAddon align="inline-end">
  <SearchIcon />
</InputGroupAddon>
```

### View code 4

```tsx
<InputGroupAddon>
  <InputGroupButton>Button</InputGroupButton>
  <InputGroupButton>Button</InputGroupButton>
</InputGroupAddon>
```

### View code 5

```tsx
<InputGroupButton>Button</InputGroupButton>
<InputGroupButton size="icon-xs" aria-label="Copy">
  <CopyIcon />
</InputGroupButton>
```

### View code 6

```tsx
<InputGroup>
  <InputGroupInput placeholder="Enter text..." />
  <InputGroupAddon>
    <SearchIcon />
  </InputGroupAddon>
</InputGroup>
```

### View code 7

```tsx
<InputGroup>
  <InputGroupTextarea placeholder="Enter message..." />
  <InputGroupAddon align="block-end">
    <InputGroupButton>Send</InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```

### View code 8

```tsx
import { Search } from "lucide-react"

import {
```

### View code 9

```tsx
import { Search } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

export function InputGroupDemo() {
  return (
    <InputGroup className="max-w-xs">
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
    </InputGroup>
  )
}
```

### View code 10

```tsx
import { SearchIcon } from "lucide-react"

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

export function InputGroupInlineStart() {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="inline-start-input">Input</FieldLabel>
      <InputGroup>
        <InputGroupInput id="inline-start-input" placeholder="Search..." />
        <InputGroupAddon align="inline-start">
          <SearchIcon className="text-muted-foreground" />
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription>Icon positioned at the start.</FieldDescription>
    </Field>
  )
}
```

### View code 11

```tsx
import { SearchIcon } from "lucide-react"

import {
```

### View code 12

```tsx
import { EyeOffIcon } from "lucide-react"

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

export function InputGroupInlineEnd() {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="inline-end-input">Input</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id="inline-end-input"
          type="password"
          placeholder="Enter password"
        />
        <InputGroupAddon align="inline-end">
          <EyeOffIcon />
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription>Icon positioned at the end.</FieldDescription>
    </Field>
  )
}
```

### View code 13

```tsx
import { EyeOffIcon } from "lucide-react"

import {
```

### View code 14

```tsx
import { CopyIcon, FileCodeIcon } from "lucide-react"

import {
```

### View code 15

```tsx
import {
  Field,
  FieldDescription,
```

### View code 16

```tsx
import {
  CheckIcon,
  CreditCardIcon,
```

### View code 17

```tsx
import {
  InputGroup,
  InputGroupAddon,
```

### View code 18

```tsx
"use client"

import * as React from "react"
```

### View code 19

```tsx
import { SearchIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"

export function InputGroupKbd() {
  return (
    <InputGroup className="max-w-sm">
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon>
        <SearchIcon className="text-muted-foreground" />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <Kbd>⌘K</Kbd>
      </InputGroupAddon>
    </InputGroup>
  )
}
```

### View code 20

```tsx
"use client"

import { ChevronDownIcon, MoreHorizontal } from "lucide-react"
```

### View code 21

```tsx
import { LoaderIcon } from "lucide-react"

import {
```

### View code 22

```tsx
import {
  IconBrandJavascript,
  IconCopy,
```

### View code 23

```tsx
"use client"

import TextareaAutosize from "react-textarea-autosize"
```
## Input OTP

Fuente: https://ui.shadcn.com/docs/components/input-otp


### View code 1

```tsx
<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>
```

### View code 2

```tsx
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

;<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
  ...
</InputOTP>
```

### View code 3

```tsx
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function InputOTPDemo() {
  return (
    <InputOTP maxLength={6} defaultValue="123456">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}
```

### View code 4

```tsx
import {
  InputOTP,
  InputOTPGroup,
```

### View code 5

```tsx
"use client"

import { REGEXP_ONLY_DIGITS } from "input-otp"

import { Field, FieldLabel } from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function InputOTPPattern() {
  return (
    <Field className="w-fit">
      <FieldLabel htmlFor="digits-only">Digits Only</FieldLabel>
      <InputOTP id="digits-only" maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </Field>
  )
}
```

### View code 6

```tsx
"use client"

import { REGEXP_ONLY_DIGITS } from "input-otp"
```

### View code 7

```tsx
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function InputOTPWithSeparator() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}
```

### View code 8

```tsx
import { Field, FieldLabel } from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function InputOTPDisabled() {
  return (
    <InputOTP id="disabled" maxLength={6} disabled value="123456">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}
```

### View code 9

```tsx
import { Field, FieldLabel } from "@/components/ui/field"
import {
  InputOTP,
```

### View code 10

```tsx
"use client"

import * as React from "react"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function InputOTPControlled() {
  const [value, setValue] = React.useState("")

  return (
    <div className="space-y-2">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="text-center text-sm">
        {value === "" ? (
          <>Enter your one-time password.</>
        ) : (
          <>You entered: {value}</>
        )}
      </div>
    </div>
  )
}
```

### View code 11

```tsx
"use client"

import * as React from "react"
```

### View code 12

```tsx
"use client"

import * as React from "react"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function InputOTPInvalid() {
  const [value, setValue] = React.useState("000000")

  return (
    <InputOTP maxLength={6} value={value} onChange={setValue}>
      <InputOTPGroup>
        <InputOTPSlot index={0} aria-invalid />
        <InputOTPSlot index={1} aria-invalid />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={2} aria-invalid />
        <InputOTPSlot index={3} aria-invalid />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={4} aria-invalid />
        <InputOTPSlot index={5} aria-invalid />
      </InputOTPGroup>
    </InputOTP>
  )
}
```

### View code 13

```tsx
"use client"

import { REGEXP_ONLY_DIGITS } from "input-otp"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function InputOTPFourDigits() {
  return (
    <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  )
}
```

### View code 14

```tsx
"use client"

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function InputOTPAlphanumeric() {
  return (
    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}
```

### View code 15

```tsx
"use client"

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
```

### View code 16

```tsx
import { RefreshCwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
```
## Item

Fuente: https://ui.shadcn.com/docs/components/item


### View code 1

```tsx
<Item>
  <ItemMedia variant="icon">
    <Icon />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Title</ItemTitle>
    <ItemDescription>Description</ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button>Action</Button>
  </ItemActions>
</Item>
```

### View code 2

```tsx
<Item render={<a href="/dashboard" />}>
  <ItemMedia variant="icon">
    <HomeIcon />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Dashboard</ItemTitle>
    <ItemDescription>Overview of your account and activity.</ItemDescription>
  </ItemContent>
</Item>
```

### View code 3

```tsx
<ItemGroup>
  <Item />
  <Item />
</ItemGroup>
```

### View code 4

```tsx
<ItemGroup>
  <Item />
  <ItemSeparator />
  <Item />
</ItemGroup>
```

### View code 5

```tsx
<ItemMedia variant="icon">
  <Icon />
</ItemMedia>
```

### View code 6

```tsx
<ItemMedia variant="image">
  <img src="..." alt="..." />
</ItemMedia>
```

### View code 7

```tsx
<ItemContent>
  <ItemTitle>Title</ItemTitle>
  <ItemDescription>Description</ItemDescription>
</ItemContent>
```

### View code 8

```tsx
<ItemTitle>Item Title</ItemTitle>
```

### View code 9

```tsx
<ItemDescription>Item description</ItemDescription>
```

### View code 10

```tsx
<ItemActions>
  <Button>Action</Button>
</ItemActions>
```

### View code 11

```tsx
<Item>
  <ItemHeader>Header</ItemHeader>
  <ItemContent>...</ItemContent>
</Item>
```

### View code 12

```tsx
<Item>
  <ItemContent>...</ItemContent>
  <ItemFooter>Footer</ItemFooter>
</Item>
```

### View code 13

```tsx
import { BadgeCheckIcon, ChevronRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
```

### View code 14

```tsx
import { InboxIcon } from "lucide-react"

import {
```

### View code 15

```tsx
import { ShieldAlertIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

export function ItemIcon() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-6">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <ShieldAlertIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Security Alert</ItemTitle>
          <ItemDescription>
            New login detected from unknown device.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline">
            Review
          </Button>
        </ItemActions>
      </Item>
    </div>
  )
}
```

### View code 16

```tsx
import { ShieldAlertIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
```

### View code 17

```tsx
import { Plus } from "lucide-react"

import {
```

### View code 18

```tsx
import Image from "next/image"

import {
```

### View code 19

```tsx
import * as React from "react"
import { PlusIcon } from "lucide-react"
```

### View code 20

```tsx
import { ChevronRightIcon, ExternalLinkIcon } from "lucide-react"

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"

export function ItemLink() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Item render={<a href="#"><ItemContent>
          <ItemTitle>Visit our documentation</ItemTitle>
          <ItemDescription>
            Learn how to get started with our components.
          </ItemDescription>
        </ItemContent><ItemActions>
          <ChevronRightIcon className="size-4" />
        </ItemActions></a>} />
      <Item variant="outline" render={<a href="#" target="_blank" rel="noopener noreferrer"><ItemContent>
          <ItemTitle>External resource</ItemTitle>
          <ItemDescription>
            Opens in a new tab with security attributes.
          </ItemDescription>
        </ItemContent><ItemActions>
          <ExternalLinkIcon className="size-4" />
        </ItemActions></a>} />
    </div>
  )
}
```

### View code 21

```tsx
import { ChevronRightIcon, ExternalLinkIcon } from "lucide-react"

import {
```

### View code 22

```tsx
"use client"

import { ChevronDownIcon } from "lucide-react"
```

### View code 23

```tsx
"use client"

import * as React from "react"
```
## Kbd

Fuente: https://ui.shadcn.com/docs/components/kbd


### View code 1

```tsx
<Kbd>Ctrl</Kbd>
```

### View code 2

```tsx
<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <Kbd>B</Kbd>
</KbdGroup>
```

### View code 3

```tsx
import { Kbd, KbdGroup } from "@/components/ui/kbd"

export function KbdDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>⌥</Kbd>
        <Kbd>⌃</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <span>+</span>
        <Kbd>B</Kbd>
      </KbdGroup>
    </div>
  )
}
```

### View code 4

```tsx
import { Kbd, KbdGroup } from "@/components/ui/kbd"

export function KbdDemo() {
```

### View code 5

```tsx
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"

export function KbdButton() {
  return (
    <Button variant="outline">
      Accept{" "}
      <Kbd data-icon="inline-end" className="translate-x-0.5">
        ⏎
      </Kbd>
    </Button>
  )
}
```

### View code 6

```tsx
import { Kbd, KbdGroup } from "@/components/ui/kbd"

export function KbdGroupExample() {
```

### View code 7

```tsx
import { Kbd, KbdGroup } from "@/components/ui/kbd"

export function KbdGroupExample() {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-muted-foreground">
        Use{" "}
        <KbdGroup>
          <Kbd>Ctrl + B</Kbd>
          <Kbd>Ctrl + K</Kbd>
        </KbdGroup>{" "}
        to open the command palette
      </p>
    </div>
  )
}
```

### View code 8

```tsx
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
```

### View code 9

```tsx
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function KbdTooltip() {
  return (
    <div className="flex flex-wrap gap-4">
      <ButtonGroup>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline">Save</Button>} />
          <TooltipContent>
            Save Changes <Kbd>S</Kbd>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline">Print</Button>} />
          <TooltipContent>
            Print Document{" "}
            <KbdGroup>
              <Kbd>Ctrl</Kbd>
              <Kbd>P</Kbd>
            </KbdGroup>
          </TooltipContent>
        </Tooltip>
      </ButtonGroup>
    </div>
  )
}
```

### View code 10

```tsx
import { SearchIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"

export function KbdInputGroup() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-6">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
```

### View code 11

```tsx
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
```

### View code 12

```tsx
import { SearchIcon } from "lucide-react"

import {
```

### View code 13

```tsx
"use client"

import * as React from "react"
```

### View code 14

```tsx
"use client"

import * as React from "react"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import { Kbd, KbdGroup } from "@/components/ui/kbd"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {},
  },
  ar: {
    dir: "rtl",
    values: {},
  },
  he: {
    dir: "rtl",
    values: {},
  },
}

export function KbdRtl() {
  const { dir } = useTranslation(translations, "ar")

  return (
    <div className="flex flex-col items-center gap-4" dir={dir}>
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>⌥</Kbd>
        <Kbd>⌃</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <span>+</span>
        <Kbd>B</Kbd>
      </KbdGroup>
    </div>
  )
}
```
## Label

Fuente: https://ui.shadcn.com/docs/components/label


### View code 1

```tsx
<Label htmlFor="email">Your email address</Label>
```

### View code 2

```tsx
<Field>
  <FieldLabel htmlFor="email">Your email address</FieldLabel>
  <Input id="email" />
</Field>
```

### View code 3

```tsx
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
```

### View code 4

```tsx
"use client"

import * as React from "react"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      label: "Accept terms and conditions",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      label: "قبول الشروط والأحكام",
    },
  },
  he: {
    dir: "rtl",
    values: {
      label: "קבל תנאים והגבלות",
    },
  },
}

export function LabelRtl() {
  const { dir, t } = useTranslation(translations, "ar")

  return (
    <div className="flex gap-2" dir={dir}>
      <Checkbox id="terms-rtl" dir={dir} />
      <Label htmlFor="terms-rtl" dir={dir}>
        {t.label}
      </Label>
    </div>
  )
}
```

### View code 5

```tsx
"use client"

import * as React from "react"
```
## Marker

Fuente: https://ui.shadcn.com/docs/components/marker


### View code 1

```tsx
<Marker>
  <MarkerIcon>
    <CheckIcon />
  </MarkerIcon>
  <MarkerContent>Explored 4 files</MarkerContent>
</Marker>
```

### View code 2

```tsx
import { Marker, MarkerContent } from "@/components/ui/marker"

export function MarkerLinkDemo() {
  return (
    <Marker render={<a href="#" />}>
      <MarkerContent>View the pull request</MarkerContent>
    </Marker>
  )
}
```

### View code 3

```tsx
<Marker role="status">
  <MarkerIcon>
    <Spinner />
  </MarkerIcon>
  <MarkerContent>Compacting conversation</MarkerContent>
</Marker>
```

### View code 4

```tsx
<Marker variant="separator">
  <MarkerContent>Today</MarkerContent>
</Marker>
```

### View code 5

```tsx
<Marker variant="border">
  <MarkerIcon>
    <FileTextIcon />
  </MarkerIcon>
  <MarkerContent>Opened implementation notes</MarkerContent>
</Marker>
```

### View code 6

```tsx
<Marker aria-label="Synced">
  <MarkerIcon>
    <CheckIcon />
  </MarkerIcon>
</Marker>
```

### View code 7

```tsx
<Marker render={<a href="/files" />}>
  <MarkerIcon>
    <FileTextIcon />
  </MarkerIcon>
  <MarkerContent>Explored 4 files</MarkerContent>
</Marker>
```

### View code 8

```tsx
import { GitBranchIcon, SearchIcon } from "lucide-react"

import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"
import { Spinner } from "@/components/ui/spinner"

export function MarkerDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8 py-12">
      <Marker>
        <MarkerIcon>
          <GitBranchIcon />
        </MarkerIcon>
        <MarkerContent>Switched to a new branch</MarkerContent>
      </Marker>
      <Marker role="status">
        <MarkerIcon>
          <Spinner />
        </MarkerIcon>
        <MarkerContent className="shimmer">Thinking...</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>Conversation compacted</MarkerContent>
      </Marker>
      <Marker>
        <MarkerIcon>
          <SearchIcon />
        </MarkerIcon>
        <MarkerContent>Explored 4 files</MarkerContent>
      </Marker>
    </div>
  )
}
```

### View code 9

```tsx
import { GitBranchIcon, SearchIcon } from "lucide-react"

import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"
```

### View code 10

```tsx
import { Marker, MarkerContent } from "@/components/ui/marker"

export function MarkerVariantsDemo() {
```

### View code 11

```tsx
import { Marker, MarkerContent } from "@/components/ui/marker"

export function MarkerVariantsDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8 py-12">
      <Marker>
        <MarkerContent>A default marker for inline notes.</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>A separator marker</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerContent>A border marker for row boundaries.</MarkerContent>
      </Marker>
    </div>
  )
}
```

### View code 12

```tsx
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"
import { Spinner } from "@/components/ui/spinner"

export function MarkerStatusDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8 py-12">
      <Marker role="status">
        <MarkerIcon>
          <Spinner />
        </MarkerIcon>
        <MarkerContent>Compacting conversation</MarkerContent>
      </Marker>
      <Marker variant="separator" role="status">
        <MarkerIcon>
          <Spinner />
        </MarkerIcon>
        <MarkerContent>Running tests</MarkerContent>
      </Marker>
    </div>
  )
}
```

### View code 13

```tsx
import { Marker, MarkerContent } from "@/components/ui/marker"

export function MarkerShimmerDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8 py-12">
      <Marker role="status">
        <MarkerContent className="shimmer">Thinking...</MarkerContent>
      </Marker>
      <Marker variant="separator" role="status">
        <MarkerContent className="shimmer">Reading 4 files</MarkerContent>
      </Marker>
    </div>
  )
}
```

### View code 14

```tsx
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"
import { Spinner } from "@/components/ui/spinner"
```

### View code 15

```tsx
import { Marker, MarkerContent } from "@/components/ui/marker"

export function MarkerShimmerDemo() {
```

### View code 16

```tsx
import { Marker, MarkerContent } from "@/components/ui/marker"

export function MarkerSeparatorDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8 py-12">
      <Marker variant="separator">
        <MarkerContent>Today</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>Worked for 42s</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>Conversation compacted</MarkerContent>
      </Marker>
    </div>
  )
}
```

### View code 17

```tsx
import { Marker, MarkerContent } from "@/components/ui/marker"

export function MarkerSeparatorDemo() {
```

### View code 18

```tsx
import { FileTextIcon, GitBranchIcon, SearchIcon } from "lucide-react"

import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"

export function MarkerBorderDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3 py-12">
      <Marker variant="border">
        <MarkerIcon>
          <GitBranchIcon />
        </MarkerIcon>
        <MarkerContent>Switched to release-candidate</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerIcon>
          <SearchIcon />
        </MarkerIcon>
        <MarkerContent>Reviewed 8 related files</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerIcon>
          <FileTextIcon />
        </MarkerIcon>
        <MarkerContent>Opened implementation notes</MarkerContent>
      </Marker>
    </div>
  )
}
```

### View code 19

```tsx
import { FileTextIcon, GitBranchIcon, SearchIcon } from "lucide-react"

import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"
```

### View code 20

```tsx
import { BookOpenCheck, GitBranchIcon, SearchIcon } from "lucide-react"

import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"

export function MarkerIconDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-12 py-12">
      <Marker>
        <MarkerIcon>
          <GitBranchIcon />
        </MarkerIcon>
        <MarkerContent>Switched to a new branch</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerIcon>
          <SearchIcon />
        </MarkerIcon>
        <MarkerContent>Explored 4 files</MarkerContent>
      </Marker>
      <Marker className="flex-col">
        <MarkerIcon>
          <BookOpenCheck />
        </MarkerIcon>
        <MarkerContent>Syncing completed</MarkerContent>
      </Marker>
    </div>
  )
}
```

### View code 21

```tsx
import { BookOpenCheck, GitBranchIcon, SearchIcon } from "lucide-react"

import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"
```

### View code 22

```tsx
"use client"

import { GitBranchIcon, RotateCcwIcon } from "lucide-react"
import { toast } from "sonner"

import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"

export function MarkerLinkButtonDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8 py-12">
      <Marker render={<a href="#links-and-buttons"><MarkerIcon>
          <GitBranchIcon />
        </MarkerIcon><MarkerContent>View the pull request</MarkerContent></a>} />
      <Marker render={<button type="button" className="transition-colors hover:text-foreground" onClick={() => toast("You clicked the revert button")}><MarkerIcon>
          <RotateCcwIcon />
        </MarkerIcon><MarkerContent>Revert this change</MarkerContent></button>} />
    </div>
  )
}
```

### View code 23

```tsx
"use client"

import { GitBranchIcon, RotateCcwIcon } from "lucide-react"
```

## Menubar

Fuente: https://ui.shadcn.com/docs/components/menubar


### View code 1

```tsx
<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarGroup>
        <MenubarItem>
          New Tab <MenubarShortcut>⌘T</MenubarShortcut>
        </MenubarItem>
        <MenubarItem>New Window</MenubarItem>
      </MenubarGroup>
      <MenubarSeparator />
      <MenubarGroup>
        <MenubarItem>Share</MenubarItem>
        <MenubarItem>Print</MenubarItem>
      </MenubarGroup>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
```

### View code 2

```tsx
import {
  Menubar,
  MenubarCheckboxItem,
```

### View code 3

```tsx
"use client"

import * as React from "react"
```

### View code 4

```tsx
import {
  Menubar,
  MenubarContent,
```

### View code 5

```tsx
import {
  FileIcon,
  FolderIcon,
```
## Message

Fuente: https://ui.shadcn.com/docs/components/message


### View code 1

```tsx
<Message>
  <MessageAvatar>
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </MessageAvatar>
  <MessageContent>
    <Bubble>
      <BubbleContent>How can I help you today?</BubbleContent>
    </Bubble>
  </MessageContent>
</Message>
```

### View code 2

```tsx
<MessageFooter>
  <Button variant="ghost" size="icon" aria-label="Copy">
    <CopyIcon />
  </Button>
</MessageFooter>
```

### View code 3

```tsx
<Message>
  <Marker role="status">
    <MarkerIcon>
      <Spinner />
    </MarkerIcon>
    <MarkerContent>Checking the logs...</MarkerContent>
  </Marker>
</Message>
```

### View code 4

```tsx
import {
  Avatar,
  AvatarFallback,
```

### View code 5

```tsx
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import {
  Message,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from "@/components/ui/message"

export function MessageHeaderFooterDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8 py-12">
      <Message>
        <MessageContent>
          <MessageHeader>Olivia</MessageHeader>
          <Bubble variant="muted">
            <BubbleContent>I already checked the logs.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>
              Send the report to the team. Ping @shadcn if you need help.
            </BubbleContent>
          </Bubble>
          <MessageFooter>
            <div>
              Read <span className="font-normal">Yesterday</span>
            </div>
          </MessageFooter>
        </MessageContent>
      </Message>
    </div>
  )
}
```

### View code 6

```tsx
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import {
  Message,
```

### View code 7

```tsx
import {
  CopyIcon,
  RefreshCcwIcon,
```

### View code 8

```tsx
"use client"

import { DownloadIcon, FileTextIcon } from "lucide-react"
```

## Message Scroller

Fuente: https://ui.shadcn.com/docs/components/message-scroller


### View code 1

```tsx
<MessageScrollerProvider>
  <MessageScroller>
    <MessageScrollerViewport>
      <MessageScrollerContent>
        {messages.map((message) => (
          <MessageScrollerItem
            key={message.id}
            messageId={message.id}
            scrollAnchor={message.role === "user"}
          >
            <Message />
          </MessageScrollerItem>
        ))}
      </MessageScrollerContent>
    </MessageScrollerViewport>
    <MessageScrollerButton />
  </MessageScroller>
</MessageScrollerProvider>
```

### View code 2

```tsx
<div className="flex h-screen flex-col">
  <MessageScrollerProvider>
    <MessageScroller className="flex-1">{/* transcript */}</MessageScroller>
  </MessageScrollerProvider>
</div>
```

### View code 3

```tsx
<MessageScrollerProvider>
  <MessageScroller>
    <MessageScrollerViewport>
      <MessageScrollerContent>
        <MessageScrollerItem>
          {/* a message, marker, or row */}
        </MessageScrollerItem>
        <MessageScrollerItem />
        <MessageScrollerItem />
      </MessageScrollerContent>
    </MessageScrollerViewport>
    <MessageScrollerButton />
  </MessageScroller>
</MessageScrollerProvider>
```

### View code 4

```tsx
<MessageScrollerItem messageId="marcus-joined" scrollAnchor>
  <Marker variant="separator">
    <MarkerContent>Marcus joined the chat</MarkerContent>
  </Marker>
</MessageScrollerItem>
```

### View code 5

```tsx
<MessageScrollerProvider autoScroll>
  <MessageScroller>{/* streamed turns */}</MessageScroller>
</MessageScrollerProvider>
```

### View code 6

```tsx
<MessageScrollerProvider defaultScrollPosition="last-anchor">
  <MessageScroller>{/* transcript */}</MessageScroller>
</MessageScrollerProvider>
```

### View code 7

```tsx
const scrollToEndScript = `(function () {
  var viewport = document.getElementById("messages")
  if (!viewport) {
    return
  }
  viewport.scrollTop = viewport.scrollHeight
  viewport.removeAttribute("data-pending-scroll")
})()`

<MessageScroller>
  <MessageScrollerViewport id="messages" suppressHydrationWarning>
    <MessageScrollerContent>{/* transcript */}</MessageScrollerContent>
  </MessageScrollerViewport>
  <script dangerouslySetInnerHTML={{ __html: scrollToEndScript }} />
  <MessageScrollerButton />
</MessageScroller>
```

### View code 8

```tsx
const MotionMessageScrollerItem = motion.create(MessageScrollerItem)
```

### View code 9

```tsx
import { useMessageScroller } from "@/components/ui/message-scroller"
```

### View code 10

```tsx
const { scrollToMessage, scrollToEnd, scrollToStart } = useMessageScroller()
```

### View code 11

```tsx
import { useMessageScrollerVisibility } from "@/components/ui/message-scroller"
```

### View code 12

```tsx
const { currentAnchorId, visibleMessageIds } = useMessageScrollerVisibility()
```

### View code 13

```tsx
import { useMessageScrollerScrollable } from "@/components/ui/message-scroller"
```

### View code 14

```tsx
const { start, end } = useMessageScrollerScrollable()
```

### View code 15

```tsx
<MessageScrollerContent aria-busy={status === "streaming"}>
  {/* messages */}
</MessageScrollerContent>
```

## Native Select

Fuente: https://ui.shadcn.com/docs/components/native-select


### View code 1

```tsx
<NativeSelect>
  <NativeSelectOption value="">Select a fruit</NativeSelectOption>
  <NativeSelectOption value="apple">Apple</NativeSelectOption>
  <NativeSelectOption value="banana">Banana</NativeSelectOption>
  <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
  <NativeSelectOption value="pineapple">Pineapple</NativeSelectOption>
</NativeSelect>
```

### View code 2

```tsx
<NativeSelect>
  <NativeSelectOption value="option1">Option 1</NativeSelectOption>
  <NativeSelectOption value="option2">Option 2</NativeSelectOption>
</NativeSelect>
```

### View code 3

```tsx
<NativeSelectOptGroup label="Fruits">
  <NativeSelectOption value="apple">Apple</NativeSelectOption>
  <NativeSelectOption value="banana">Banana</NativeSelectOption>
</NativeSelectOptGroup>
```

### View code 4

```tsx
import {
  NativeSelect,
  NativeSelectOption,
```

### View code 5

```tsx
import {
  NativeSelect,
  NativeSelectOptGroup,
```

### View code 6

```tsx
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"

export function NativeSelectDisabled() {
  return (
    <NativeSelect disabled>
      <NativeSelectOption value="">Disabled</NativeSelectOption>
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
      <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
    </NativeSelect>
  )
}
```

### View code 7

```tsx
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"

export function NativeSelectInvalid() {
  return (
    <NativeSelect aria-invalid="true">
      <NativeSelectOption value="">Error state</NativeSelectOption>
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
      <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
    </NativeSelect>
  )
}
```

### View code 8

```tsx
"use client"

import * as React from "react"
```
## Navigation Menu

Fuente: https://ui.shadcn.com/docs/components/navigation-menu


### View code 1

```tsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink>Link</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

### View code 2

```tsx
import Link from "next/link"

import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function NavigationMenuDemo() {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        render={<Link href="/docs" />}
        className={navigationMenuTriggerStyle()}
      >
        Documentation
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}
```
## Pagination

Fuente: https://ui.shadcn.com/docs/components/pagination


### View code 1

```tsx
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

### View code 2

```tsx
function PaginationPrevious({
    className,
+   text = "Previous",
    ...props
- }: React.ComponentProps<typeof PaginationLink>) {
+ }: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
    return (
      <PaginationLink
        aria-label="Go to previous page"
        size="default"
        className={cn("cn-pagination-previous", className)}
        {...props}
      >
        <ChevronLeftIcon />
        <span className="cn-pagination-previous-text hidden sm:block">
-         Previous
+         {text}
        </span>
      </PaginationLink>
    )
  }
```

### View code 3

```tsx
function PaginationNext({
    className,
+   text = "Next",
    ...props
- }: React.ComponentProps<typeof PaginationLink>) {
+ }: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
    return (
      <PaginationLink
        aria-label="Go to next page"
        size="default"
        className={cn("cn-pagination-next", className)}
        {...props}
      >
-       <span className="cn-pagination-next-text hidden sm:block">Next</span>
+       <span className="cn-pagination-next-text hidden sm:block">{text}</span>
        <ChevronRightIcon />
      </PaginationLink>
    )
  }
```

### View code 4

```tsx
import {
  Pagination,
  PaginationContent,
```

### View code 5

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"

export function PaginationSimple() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">5</PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
```

### View code 6

```tsx
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Pagination,
```

### View code 7

```tsx
"use client"

import * as React from "react"
```
## Popover

Fuente: https://ui.shadcn.com/docs/components/popover


### View code 1

```tsx
<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>
    Open Popover
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Title</PopoverTitle>
      <PopoverDescription>Description text here.</PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>
```

### View code 2

```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
```

### View code 3

```tsx
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

export function PopoverBasic() {
  return (
    <>
      <Popover>
        <PopoverTrigger render={<Button variant="outline" className="w-fit">Open Popover</Button>} />
        <PopoverContent align="start">
          <PopoverHeader>
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverDescription>
              Set the dimensions for the layer.
            </PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </>
  )
}
```

### View code 4

```tsx
import { Button } from "@/components/ui/button"
import {
  Popover,
```

### View code 5

```tsx
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function PopoverAlignments() {
  return (
    <>
      <div className="flex gap-6">
        <Popover>
          <PopoverTrigger render={<Button variant="outline" size="sm">Start</Button>} />
          <PopoverContent align="start" className="w-40">
            Aligned to start
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger render={<Button variant="outline" size="sm">Center</Button>} />
          <PopoverContent align="center" className="w-40">
            Aligned to center
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger render={<Button variant="outline" size="sm">End</Button>} />
          <PopoverContent align="end" className="w-40">
            Aligned to end
          </PopoverContent>
        </Popover>
      </div>
    </>
  )
}
```

### View code 6

```tsx
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
```

### View code 7

```tsx
"use client"

import {
```
## Progress

Fuente: https://ui.shadcn.com/docs/components/progress


### View code 1

```tsx
<Progress value={33} />
```

### View code 2

```tsx
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"

;<Progress value={56} className="w-full max-w-sm">
  <ProgressLabel>Upload progress</ProgressLabel>
  <ProgressValue />
</Progress>
```

### View code 3

```tsx
"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"

export function ProgressDemo() {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return <Progress value={progress} className="w-[60%]" />
}
```

### View code 4

```tsx
"use client"

import * as React from "react"
```

### View code 5

```tsx
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"

export function ProgressWithLabel() {
  return (
    <Progress value={56} className="w-full max-w-sm">
      <ProgressLabel>Upload progress</ProgressLabel>
      <ProgressValue />
    </Progress>
  )
}
```

### View code 6

```tsx
import {
  Progress,
  ProgressLabel,
```

### View code 7

```tsx
"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"

export function ProgressControlled() {
  const [value, setValue] = React.useState(50)

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Progress value={value} className="w-full" />
      <Slider
        value={value}
        onValueChange={(value) => setValue(value as number)}
        min={0}
        max={100}
        step={1}
      />
    </div>
  )
}
```
## Questionnaire

Fuente: https://ui.shadcn.com/docs/components/questionnaire


### View code 1

```tsx
const items = [
  {
    name: "direction",
    required: true,
    prompt: "What should we prototype next?",
    description: "Choose a direction or write your own.",
    choices: [
      {
        value: "delegation",
        label: "Delegation",
        description: "Show how work moves to a specialist.",
      },
      {
        value: "questions",
        label: "Question prompts",
        description: "Show choices while the interface waits.",
      },
      { value: "both", label: "Both together" },
    ],
    input: { label: "Another answer", placeholder: "Type another answer…" },
  },
  {
    name: "detail",
    required: false,
    prompt: "How much detail should it include?",
    description: "Skip this if you are not sure yet.",
    choices: [
      { value: "focused", label: "Focused" },
      { value: "complete", label: "Complete flow" },
    ],
  },
] as const
```

### View code 2

```tsx
function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()
  const answers = new FormData(event.currentTarget)
  // answers.get("direction"), answers.getAll(...) for multiple items.
}
```

### View code 3

```tsx
"use client"

import * as React from "react"
```

## Radio Group

Fuente: https://ui.shadcn.com/docs/components/radio-group


### View code 1

```tsx
<RadioGroup defaultValue="option-one">
  <div className="flex items-center gap-3">
    <RadioGroupItem value="option-one" id="option-one" />
    <Label htmlFor="option-one">Option One</Label>
  </div>
  <div className="flex items-center gap-3">
    <RadioGroupItem value="option-two" id="option-two" />
    <Label htmlFor="option-two">Option Two</Label>
  </div>
</RadioGroup>
```

### View code 2

```tsx
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
```

### View code 3

```tsx
import {
  Field,
  FieldContent,
```

### View code 4

```tsx
import {
  Field,
  FieldDescription,
```

### View code 5

```tsx
import { Field, FieldLabel } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function RadioGroupDisabled() {
  return (
    <RadioGroup defaultValue="option2" className="w-fit">
      <Field orientation="horizontal" data-disabled>
        <RadioGroupItem value="option1" id="disabled-1" disabled />
        <FieldLabel htmlFor="disabled-1" className="font-normal">
          Disabled
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem value="option2" id="disabled-2" />
        <FieldLabel htmlFor="disabled-2" className="font-normal">
          Option 2
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem value="option3" id="disabled-3" />
        <FieldLabel htmlFor="disabled-3" className="font-normal">
          Option 3
        </FieldLabel>
      </Field>
    </RadioGroup>
  )
}
```

### View code 6

```tsx
import { Field, FieldLabel } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
```

### View code 7

```tsx
"use client"

import * as React from "react"
```
## Resizable

Fuente: https://ui.shadcn.com/docs/components/resizable


### View code 1

```tsx
<ResizablePanelGroup orientation="horizontal">
  <ResizablePanel>One</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>Two</ResizablePanel>
</ResizablePanelGroup>
```

### View code 2

```tsx
import {
  ResizableHandle,
  ResizablePanel,
```

### View code 3

```tsx
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export function ResizableVertical() {
  return (
    <ResizablePanelGroup
      orientation="vertical"
      className="min-h-[200px] max-w-sm rounded-lg border"
    >
      <ResizablePanel defaultSize="25%">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Header</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="75%">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
```

### View code 4

```tsx
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export function ResizableHandleDemo() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="min-h-[200px] max-w-sm rounded-lg border"
    >
      <ResizablePanel defaultSize="25%">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="75%">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
```

### View code 5

```tsx
"use client"

import * as React from "react"
```
## Scroll Area

Fuente: https://ui.shadcn.com/docs/components/scroll-area


### View code 1

```tsx
<ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
  Your scrollable content here.
</ScrollArea>
```

### View code 2

```tsx
import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

export function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  )
}
```

### View code 3

```tsx
import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
```

### View code 4

```tsx
import * as React from "react"
import Image from "next/image"
```

### View code 5

```tsx
"use client"

import * as React from "react"
```
## Select

Fuente: https://ui.shadcn.com/docs/components/select


### View code 1

```tsx
const items = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
]

<Select items={items}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      {items.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </SelectGroup>
  </SelectContent>
</Select>
```

### View code 2

```tsx
<Field data-invalid>
  <FieldLabel>Fruit</FieldLabel>
  <SelectTrigger aria-invalid>
    <SelectValue />
  </SelectTrigger>
</Field>
```

### View code 3

```tsx
import {
  Select,
  SelectContent,
```

### View code 4

```tsx
"use client"

import * as React from "react"
```

### View code 5

```tsx
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  Select,
```

### View code 6

```tsx
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const items = [
  { label: "Select a fruit", value: null },
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
]

export function SelectInvalid() {
  return (
    <Field data-invalid className="w-full max-w-48">
      <FieldLabel>Fruit</FieldLabel>
      <Select items={items}>
        <SelectTrigger aria-invalid>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <FieldError>Please select a fruit.</FieldError>
    </Field>
  )
}
```
## Separator

Fuente: https://ui.shadcn.com/docs/components/separator


### View code 1

```tsx
<Separator />
```

### View code 2

```tsx
import { Separator } from "@/components/ui/separator"

export function SeparatorDemo() {
  return (
    <div className="flex max-w-sm flex-col gap-4 text-sm">
      <div className="flex flex-col gap-1.5">
        <div className="leading-none font-medium">shadcn/ui</div>
        <div className="text-muted-foreground">
          The Foundation for your Design System
        </div>
      </div>
      <Separator />
      <div>
        A set of beautifully designed components that you can customize, extend,
        and build on.
      </div>
    </div>
  )
}
```

### View code 3

```tsx
import { Separator } from "@/components/ui/separator"

export function SeparatorDemo() {
```

### View code 4

```tsx
import { Separator } from "@/components/ui/separator"

export function SeparatorVertical() {
  return (
    <div className="flex h-5 items-center gap-4 text-sm">
      <div>Blog</div>
      <Separator orientation="vertical" />
      <div>Docs</div>
      <Separator orientation="vertical" />
      <div>Source</div>
    </div>
  )
}
```

### View code 5

```tsx
import { Separator } from "@/components/ui/separator"

export function SeparatorVertical() {
```

### View code 6

```tsx
import { Separator } from "@/components/ui/separator"

export function SeparatorMenu() {
  return (
    <div className="flex items-center gap-2 text-sm md:gap-4">
      <div className="flex flex-col gap-1">
        <span className="font-medium">Settings</span>
        <span className="text-xs text-muted-foreground">
          Manage preferences
        </span>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-col gap-1">
        <span className="font-medium">Account</span>
        <span className="text-xs text-muted-foreground">
          Profile & security
        </span>
      </div>
      <Separator orientation="vertical" className="hidden md:block" />
      <div className="hidden flex-col gap-1 md:flex">
        <span className="font-medium">Help</span>
        <span className="text-xs text-muted-foreground">Support & docs</span>
      </div>
    </div>
  )
}
```

### View code 7

```tsx
import { Separator } from "@/components/ui/separator"

export function SeparatorMenu() {
```

### View code 8

```tsx
import { Separator } from "@/components/ui/separator"

export function SeparatorList() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2 text-sm">
      <dl className="flex items-center justify-between">
        <dt>Item 1</dt>
        <dd className="text-muted-foreground">Value 1</dd>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between">
        <dt>Item 2</dt>
        <dd className="text-muted-foreground">Value 2</dd>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between">
        <dt>Item 3</dt>
        <dd className="text-muted-foreground">Value 3</dd>
      </dl>
    </div>
  )
}
```

### View code 9

```tsx
import { Separator } from "@/components/ui/separator"

export function SeparatorList() {
```

### View code 10

```tsx
"use client"

import * as React from "react"
```
## Sheet

Fuente: https://ui.shadcn.com/docs/components/sheet


### View code 1

```tsx
<Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>This action cannot be undone.</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
```

### View code 2

```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
```

### View code 3

```tsx
import { Button } from "@/components/ui/button"
import {
  Sheet,
```

### View code 4

```tsx
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function SheetNoCloseButton() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline">Open Sheet</Button>} />
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>No Close Button</SheetTitle>
          <SheetDescription>
            This sheet doesn't have a close button in the top-right corner.
            Click outside to close.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
```

### View code 5

```tsx
"use client"

import {
```
## Sidebar

Fuente: https://ui.shadcn.com/docs/components/sidebar


### View code 1

```tsx
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
```

### View code 2

```tsx
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
```

### View code 3

```tsx
<SidebarProvider
  style={
    {
      "--sidebar-width": "20rem",
      "--sidebar-width-mobile": "20rem",
    } as React.CSSProperties
  }
>
  <Sidebar />
</SidebarProvider>
```

### View code 4

```tsx
const SIDEBAR_KEYBOARD_SHORTCUT = "b"
```

### View code 5

```tsx
<SidebarProvider>
  <Sidebar variant="inset" />
  <SidebarInset>
    <main>{children}</main>
  </SidebarInset>
</SidebarProvider>
```

### View code 6

```tsx
import { useSidebar } from "@/components/ui/sidebar"

export function AppSidebar() {
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar()
}
```

### View code 7

```tsx
<Sidebar>
  <SidebarHeader>
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger render={<SidebarMenuButton />}>
            Select Workspace
            <ChevronDown className="ml-auto" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <span>Acme Inc</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarHeader>
</Sidebar>
```

### View code 8

```tsx
<Sidebar>
  <SidebarFooter>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton>
          <User2 /> Username
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarFooter>
</Sidebar>
```

### View code 9

```tsx
<Sidebar>
  <SidebarContent>
    <SidebarGroup />
    <SidebarGroup />
  </SidebarContent>
</Sidebar>
```

### View code 10

```tsx
<SidebarGroup>
  <SidebarGroupLabel>Application</SidebarGroupLabel>
  <SidebarGroupAction>
    <Plus /> <span className="sr-only">Add Project</span>
  </SidebarGroupAction>
  <SidebarGroupContent></SidebarGroupContent>
</SidebarGroup>
```

### View code 11

```tsx
<Collapsible defaultOpen className="group/collapsible">
  <SidebarGroup>
    <SidebarGroupLabel render={<CollapsibleTrigger />}>
      Help
      <ChevronDown className="ml-auto transition-transform group-data-open/collapsible:rotate-180" />
    </SidebarGroupLabel>
    <CollapsibleContent>
      <SidebarGroupContent />
    </CollapsibleContent>
  </SidebarGroup>
</Collapsible>
```

### View code 12

```tsx
<SidebarMenu>
  {projects.map((project) => (
    <SidebarMenuItem key={project.name}>
      <SidebarMenuButton render={<a href={project.url} />}>
        <project.icon />
        <span>{project.name}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ))}
</SidebarMenu>
```

### View code 13

```tsx
<SidebarMenuButton render={<a href="#" />} isActive>
  Home
</SidebarMenuButton>
```

### View code 14

```tsx
<SidebarMenuItem>
  <SidebarMenuButton render={<a href="#" />}>
    <Home />
    <span>Home</span>
  </SidebarMenuButton>
  <SidebarMenuAction>
    <Plus /> <span className="sr-only">Add Project</span>
  </SidebarMenuAction>
</SidebarMenuItem>
```

### View code 15

```tsx
<SidebarMenuItem>
  <SidebarMenuButton />
  <SidebarMenuSub>
    <SidebarMenuSubItem>
      <SidebarMenuSubButton />
    </SidebarMenuSubItem>
  </SidebarMenuSub>
</SidebarMenuItem>
```

### View code 16

```tsx
<SidebarMenuItem>
  <SidebarMenuButton />
  <SidebarMenuBadge>24</SidebarMenuBadge>
</SidebarMenuItem>
```

### View code 17

```tsx
<SidebarMenu>
  {Array.from({ length: 5 }).map((_, index) => (
    <SidebarMenuItem key={index}>
      <SidebarMenuSkeleton />
    </SidebarMenuItem>
  ))}
</SidebarMenu>
```

### View code 18

```tsx
import { useSidebar } from "@/components/ui/sidebar"

export function CustomTrigger() {
  const { toggleSidebar } = useSidebar()

  return <button onClick={toggleSidebar}>Toggle Sidebar</button>
}
```

### View code 19

```tsx
<Sidebar>
  <SidebarHeader />
  <SidebarContent>
    <SidebarGroup />
  </SidebarContent>
  <SidebarFooter />
  <SidebarRail />
</Sidebar>
```

### View code 20

```tsx
export function AppSidebar() {
  const [open, setOpen] = React.useState(false)

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <Sidebar />
    </SidebarProvider>
  )
}
```

### View code 21

```tsx
<Sidebar collapsible="icon">
  <SidebarContent>
    <SidebarGroup className="group-data-[collapsible=icon]:hidden" />
  </SidebarContent>
</Sidebar>
```

### View code 22

```tsx
<SidebarMenuItem>
  <SidebarMenuButton />
  <SidebarMenuAction className="peer-data-[active=true]/menu-button:opacity-100" />
</SidebarMenuItem>
```

### View code 23

```tsx
function Sidebar({
    side = "left",
    variant = "sidebar",
    collapsible = "offcanvas",
    className,
    children,
+   dir,
    ...props
  }: React.ComponentProps<"div"> & {
    side?: "left" | "right"
    variant?: "sidebar" | "floating" | "inset"
    collapsible?: "offcanvas" | "icon" | "none"
  }) {
```

### View code 24

```tsx
<Sidebar dir="rtl" side="right">
  {/* ... */}
</Sidebar>
```

### View code 25

```tsx
<Button ...>
-   <PanelLeftIcon />
+   <PanelLeftIcon className="rtl:rotate-180" />
    <span className="sr-only">Toggle Sidebar</span>
  </Button>
```
## Skeleton

Fuente: https://ui.shadcn.com/docs/components/skeleton


### View code 1

```tsx
<Skeleton className="h-[20px] w-[100px] rounded-full" />
```

### View code 2

```tsx
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonDemo() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
```

### View code 3

```tsx
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonDemo() {
```

### View code 4

```tsx
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonAvatar() {
  return (
    <div className="flex w-fit items-center gap-4">
      <Skeleton className="size-10 shrink-0 rounded-full" />
      <div className="grid gap-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
  )
}
```

### View code 5

```tsx
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonAvatar() {
```

### View code 6

```tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="aspect-video w-full" />
      </CardContent>
    </Card>
  )
}
```

### View code 7

```tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
```

### View code 8

```tsx
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonText() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  )
}
```

### View code 9

```tsx
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonText() {
```

### View code 10

```tsx
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonForm() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-7">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-full" />
      </div>
      <Skeleton className="h-8 w-24" />
    </div>
  )
}
```

### View code 11

```tsx
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonForm() {
```

### View code 12

```tsx
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonTable() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <div className="flex gap-4" key={index}>
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  )
}
```

### View code 13

```tsx
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonTable() {
```

### View code 14

```tsx
"use client"

import * as React from "react"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import { Skeleton } from "@/components/ui/skeleton"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {},
  },
  ar: {
    dir: "rtl",
    values: {},
  },
  he: {
    dir: "rtl",
    values: {},
  },
}

export function SkeletonRtl() {
  const { dir } = useTranslation(translations, "ar")

  return (
    <div className="flex items-center gap-4" dir={dir}>
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
```

### View code 15

```tsx
"use client"

import * as React from "react"
```
## Slider

Fuente: https://ui.shadcn.com/docs/components/slider


### View code 1

```tsx
<Slider defaultValue={[33]} max={100} step={1} />
```

### View code 2

```tsx
import { Slider } from "@/components/ui/slider"

export function SliderDemo() {
  return (
    <Slider
      defaultValue={[75]}
      max={100}
      step={1}
      className="mx-auto w-full max-w-xs"
    />
  )
}
```

### View code 3

```tsx
import { Slider } from "@/components/ui/slider"

export function SliderRange() {
```

### View code 4

```tsx
import { Slider } from "@/components/ui/slider"

export function SliderRange() {
  return (
    <Slider
      defaultValue={[25, 50]}
      max={100}
      step={5}
      className="mx-auto w-full max-w-xs"
    />
  )
}
```

### View code 5

```tsx
import { Slider } from "@/components/ui/slider"

export function SliderMultiple() {
  return (
    <Slider
      defaultValue={[10, 20, 70]}
      max={100}
      step={10}
      className="mx-auto w-full max-w-xs"
    />
  )
}
```

### View code 6

```tsx
import { Slider } from "@/components/ui/slider"

export function SliderMultiple() {
```

### View code 7

```tsx
import { Slider } from "@/components/ui/slider"

export function SliderVertical() {
  return (
    <div className="mx-auto flex w-full max-w-xs items-center justify-center gap-6">
      <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        orientation="vertical"
        className="h-40"
      />
      <Slider
        defaultValue={[25]}
        max={100}
        step={1}
        orientation="vertical"
        className="h-40"
      />
    </div>
  )
}
```

### View code 8

```tsx
import { Slider } from "@/components/ui/slider"

export function SliderVertical() {
```

### View code 9

```tsx
"use client"

import * as React from "react"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export function SliderControlled() {
  const [value, setValue] = React.useState([0.3, 0.7])

  return (
    <div className="mx-auto grid w-full max-w-xs gap-3">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor="slider-demo-temperature">Temperature</Label>
        <span className="text-sm text-muted-foreground">
          {value.join(", ")}
        </span>
      </div>
      <Slider
        id="slider-demo-temperature"
        value={value}
        onValueChange={(value) => setValue(value as number[])}
        min={0}
        max={1}
        step={0.1}
      />
    </div>
  )
}
```

### View code 10

```tsx
"use client"

import * as React from "react"
```

### View code 11

```tsx
import { Slider } from "@/components/ui/slider"

export function SliderDisabled() {
  return (
    <Slider
      defaultValue={[50]}
      max={100}
      step={1}
      disabled
      className="mx-auto w-full max-w-xs"
    />
  )
}
```

### View code 12

```tsx
import { Slider } from "@/components/ui/slider"

export function SliderDisabled() {
```

### View code 13

```tsx
"use client"

import * as React from "react"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import { Slider } from "@/components/ui/slider"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {},
  },
  ar: {
    dir: "rtl",
    values: {},
  },
  he: {
    dir: "rtl",
    values: {},
  },
}

export function SliderRtl() {
  const { dir } = useTranslation(translations, "ar")

  return (
    <Slider
      defaultValue={[75]}
      max={100}
      step={1}
      className="mx-auto w-full max-w-xs"
      dir={dir}
    />
  )
}
```
## Spinner

Fuente: https://ui.shadcn.com/docs/components/spinner


### View code 1

```tsx
<Spinner />
```

### View code 2

```tsx
import { cn } from "cn"
import { LoaderIcon } from "lucide-react"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
```

### View code 3

```tsx
import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Spinner } from "@/components/ui/spinner"

export function SpinnerDemo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
      <Item variant="muted">
        <ItemMedia>
          <Spinner />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">Processing payment...</ItemTitle>
        </ItemContent>
        <ItemContent className="flex-none justify-end">
          <span className="text-sm tabular-nums">$100.00</span>
        </ItemContent>
      </Item>
    </div>
  )
}
```

### View code 4

```tsx
import {
  Item,
  ItemContent,
```

### View code 5

```tsx
import { cn } from "cn"
import { LoaderIcon } from "lucide-react"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export function SpinnerCustom() {
  return (
    <div className="flex items-center gap-4">
      <Spinner />
    </div>
  )
}
```

### View code 6

```tsx
import { cn } from "cn"
import { LoaderIcon } from "lucide-react"
```

### View code 7

```tsx
import { Spinner } from "@/components/ui/spinner"

export function SpinnerSize() {
```

### View code 8

```tsx
import { Spinner } from "@/components/ui/spinner"

export function SpinnerSize() {
  return (
    <div className="flex items-center gap-6">
      <Spinner className="size-3" />
      <Spinner className="size-4" />
      <Spinner className="size-6" />
      <Spinner className="size-8" />
    </div>
  )
}
```

### View code 9

```tsx
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export function SpinnerButton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Button disabled size="sm">
        <Spinner data-icon="inline-start" />
        Loading...
      </Button>
      <Button variant="outline" disabled size="sm">
        <Spinner data-icon="inline-start" />
        Please wait
      </Button>
      <Button variant="secondary" disabled size="sm">
        <Spinner data-icon="inline-start" />
        Processing
      </Button>
    </div>
  )
}
```

### View code 10

```tsx
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
```

### View code 11

```tsx
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"

export function SpinnerBadge() {
  return (
    <div className="flex items-center gap-4 [--radius:1.2rem]">
      <Badge>
        <Spinner data-icon="inline-start" />
        Syncing
      </Badge>
      <Badge variant="secondary">
        <Spinner data-icon="inline-start" />
        Updating
      </Badge>
      <Badge variant="outline">
        <Spinner data-icon="inline-start" />
        Processing
      </Badge>
    </div>
  )
}
```

### View code 12

```tsx
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
```

### View code 13

```tsx
import { ArrowUpIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner"

export function SpinnerInputGroup() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Send a message..." disabled />
        <InputGroupAddon align="inline-end">
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupTextarea placeholder="Send a message..." disabled />
        <InputGroupAddon align="block-end">
          <Spinner /> Validating...
          <InputGroupButton className="ml-auto" variant="default">
            <ArrowUpIcon />
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
```

### View code 14

```tsx
import { ArrowUpIcon } from "lucide-react"

import {
```

### View code 15

```tsx
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Spinner } from "@/components/ui/spinner"

export function SpinnerEmpty() {
  return (
    <Empty className="w-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>
        <EmptyTitle>Processing your request</EmptyTitle>
        <EmptyDescription>
          Please wait while we process your request. Do not refresh the page.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          Cancel
        </Button>
      </EmptyContent>
    </Empty>
  )
}
```

### View code 16

```tsx
import { Button } from "@/components/ui/button"
import {
  Empty,
```

### View code 17

```tsx
"use client"

import * as React from "react"
```
## Switch

Fuente: https://ui.shadcn.com/docs/components/switch


### View code 1

```tsx
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function SwitchDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  )
}
```

### View code 2

```tsx
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
```

### View code 3

```tsx
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

export function SwitchDescription() {
  return (
    <Field orientation="horizontal" className="max-w-sm">
      <FieldContent>
        <FieldLabel htmlFor="switch-focus-mode">
          Share across devices
        </FieldLabel>
        <FieldDescription>
          Focus is shared across devices, and turns off when you leave the app.
        </FieldDescription>
      </FieldContent>
      <Switch id="switch-focus-mode" />
    </Field>
  )
}
```

### View code 4

```tsx
import {
  Field,
  FieldContent,
```

### View code 5

```tsx
import { Field, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

export function SwitchDisabled() {
  return (
    <Field orientation="horizontal" data-disabled className="w-fit">
      <Switch id="switch-disabled-unchecked" disabled />
      <FieldLabel htmlFor="switch-disabled-unchecked">Disabled</FieldLabel>
    </Field>
  )
}
```

### View code 6

```tsx
import { Field, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
```

### View code 7

```tsx
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

export function SwitchInvalid() {
  return (
    <Field orientation="horizontal" className="max-w-sm" data-invalid>
      <FieldContent>
        <FieldLabel htmlFor="switch-terms">
          Accept terms and conditions
        </FieldLabel>
        <FieldDescription>
          You must accept the terms and conditions to continue.
        </FieldDescription>
      </FieldContent>
      <Switch id="switch-terms" aria-invalid />
    </Field>
  )
}
```

### View code 8

```tsx
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

export function SwitchSizes() {
  return (
    <FieldGroup className="w-full max-w-[10rem]">
      <Field orientation="horizontal">
        <Switch id="switch-size-sm" size="sm" />
        <FieldLabel htmlFor="switch-size-sm">Small</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Switch id="switch-size-default" size="default" />
        <FieldLabel htmlFor="switch-size-default">Default</FieldLabel>
      </Field>
    </FieldGroup>
  )
}
```

### View code 9

```tsx
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
```

### View code 10

```tsx
"use client"

import * as React from "react"
```
## Table

Fuente: https://ui.shadcn.com/docs/components/table


### View code 1

```tsx
<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### View code 2

```tsx
import {
  Table,
  TableBody,
```

### View code 3

```tsx
import { MoreHorizontalIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
```
## Tabs

Fuente: https://ui.shadcn.com/docs/components/tabs


### View code 1

```tsx
<Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Make changes to your account here.</TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
</Tabs>
```

### View code 2

```tsx
import {
  Card,
  CardContent,
```

### View code 3

```tsx
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsLine() {
```

### View code 4

```tsx
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsLine() {
  return (
    <Tabs defaultValue="overview">
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
```

### View code 5

```tsx
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsVertical() {
  return (
    <Tabs defaultValue="account" orientation="vertical">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
```

### View code 6

```tsx
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsVertical() {
```

### View code 7

```tsx
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsDisabled() {
  return (
    <Tabs defaultValue="home">
      <TabsList>
        <TabsTrigger value="home">Home</TabsTrigger>
        <TabsTrigger value="settings" disabled>
          Disabled
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
```

### View code 8

```tsx
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsDisabled() {
```

### View code 9

```tsx
import { AppWindowIcon, CodeIcon } from "lucide-react"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsIcons() {
  return (
    <Tabs defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">
          <AppWindowIcon />
          Preview
        </TabsTrigger>
        <TabsTrigger value="code">
          <CodeIcon />
          Code
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
```

### View code 10

```tsx
import { AppWindowIcon, CodeIcon } from "lucide-react"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
```
## Textarea

Fuente: https://ui.shadcn.com/docs/components/textarea


### View code 1

```tsx
<Textarea />
```

### View code 2

```tsx
import { Textarea } from "@/components/ui/textarea"

export function TextareaDemo() {
  return <Textarea placeholder="Type your message here." />
}
```

### View code 3

```tsx
import { Textarea } from "@/components/ui/textarea"

export function TextareaDemo() {
```

### View code 4

```tsx
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

export function TextareaField() {
  return (
    <Field>
      <FieldLabel htmlFor="textarea-message">Message</FieldLabel>
      <FieldDescription>Enter your message below.</FieldDescription>
      <Textarea id="textarea-message" placeholder="Type your message here." />
    </Field>
  )
}
```

### View code 5

```tsx
import {
  Field,
  FieldDescription,
```

### View code 6

```tsx
import { Field, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
```

### View code 7

```tsx
import { Field, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

export function TextareaDisabled() {
  return (
    <Field data-disabled>
      <FieldLabel htmlFor="textarea-disabled">Message</FieldLabel>
      <Textarea
        id="textarea-disabled"
        placeholder="Type your message here."
        disabled
      />
    </Field>
  )
}
```

### View code 8

```tsx
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

export function TextareaInvalid() {
  return (
    <Field data-invalid>
      <FieldLabel htmlFor="textarea-invalid">Message</FieldLabel>
      <Textarea
        id="textarea-invalid"
        placeholder="Type your message here."
        aria-invalid
      />
      <FieldDescription>Please enter a valid message.</FieldDescription>
    </Field>
  )
}
```

### View code 9

```tsx
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function TextareaButton() {
  return (
    <div className="grid w-full gap-2">
      <Textarea placeholder="Type your message here." />
      <Button>Send message</Button>
    </div>
  )
}
```

### View code 10

```tsx
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
```

### View code 11

```tsx
"use client"

import * as React from "react"
```
## Toast

Fuente: https://ui.shadcn.com/docs/components/toast


### View code 1

```tsx
import { Toaster } from "@/components/ui/toast"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
```

### View code 2

```tsx
import { toast } from "@/components/ui/toast"
```

### View code 3

```tsx
const id = toast.add({
  title: "Event created",
  actionProps: {
    children: "Undo",
    onClick() {
      toast.close(id)
    },
  },
})
```

### View code 4

```tsx
"use client"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

export function ToastDemo() {
  function showToast() {
    const id = toast.add({
      title: "Event created",
      description: "Sunday, December 3 at 9:00 AM",
      actionProps: {
        children: "Undo",
        onClick() {
          toast.close(id)
        },
      },
    })
  }

  return (
    <Button variant="outline" onClick={showToast}>
      Show Toast
    </Button>
  )
}
```

### View code 5

```tsx
"use client"

import { Button } from "@/components/ui/button"
```

### View code 6

```tsx
"use client"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

export function ToastPromise() {
  function showToast() {
    toast.promise(
      new Promise<{ name: string }>((resolve) => {
        window.setTimeout(() => resolve({ name: "Event" }), 2000)
      }),
      {
        loading: "Creating event…",
        success: (data) => `${data.name} created.`,
        error: "Could not create event.",
      }
    )
  }

  return (
    <Button variant="outline" onClick={showToast}>
      Create Event
    </Button>
  )
}
```
## Toggle

Fuente: https://ui.shadcn.com/docs/components/toggle


### View code 1

```tsx
<Toggle>Toggle</Toggle>
```

### View code 2

```tsx
import { BookmarkIcon } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

export function ToggleDemo() {
  return (
    <Toggle aria-label="Toggle bookmark" size="sm" variant="outline">
      <BookmarkIcon className="group-aria-pressed/toggle:fill-foreground" />
      Bookmark
    </Toggle>
  )
}
```

### View code 3

```tsx
import { BookmarkIcon } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"
```

### View code 4

```tsx
import { BoldIcon, ItalicIcon } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

export function ToggleOutline() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle variant="outline" aria-label="Toggle italic">
        <ItalicIcon />
        Italic
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle bold">
        <BoldIcon />
        Bold
      </Toggle>
    </div>
  )
}
```

### View code 5

```tsx
import { BoldIcon, ItalicIcon } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"
```

### View code 6

```tsx
import { ItalicIcon } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

export function ToggleText() {
  return (
    <Toggle aria-label="Toggle italic">
      <ItalicIcon />
      Italic
    </Toggle>
  )
}
```

### View code 7

```tsx
import { ItalicIcon } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"
```

### View code 8

```tsx
import { Toggle } from "@/components/ui/toggle"

export function ToggleSizes() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle variant="outline" aria-label="Toggle small" size="sm">
        Small
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle default" size="default">
        Default
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle large" size="lg">
        Large
      </Toggle>
    </div>
  )
}
```

### View code 9

```tsx
import { Toggle } from "@/components/ui/toggle"

export function ToggleSizes() {
```

### View code 10

```tsx
import { Toggle } from "@/components/ui/toggle"

export function ToggleDisabled() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle aria-label="Toggle disabled" disabled>
        Disabled
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle disabled outline" disabled>
        Disabled
      </Toggle>
    </div>
  )
}
```

### View code 11

```tsx
import { Toggle } from "@/components/ui/toggle"

export function ToggleDisabled() {
```

### View code 12

```tsx
"use client"

import * as React from "react"
import { BookmarkIcon } from "lucide-react"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import { Toggle } from "@/components/ui/toggle"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      label: "Bookmark",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      label: "إشارة مرجعية",
    },
  },
  he: {
    dir: "rtl",
    values: {
      label: "סימנייה",
    },
  },
}

export function ToggleRtl() {
  const { dir, t } = useTranslation(translations, "ar")

  return (
    <Toggle aria-label="Toggle bookmark" size="sm" variant="outline" dir={dir}>
      <BookmarkIcon className="group-aria-pressed/toggle:fill-foreground" />
      {t.label}
    </Toggle>
  )
}
```

### View code 13

```tsx
"use client"

import * as React from "react"
```
## Toggle Group

Fuente: https://ui.shadcn.com/docs/components/toggle-group


### View code 1

```tsx
<ToggleGroup type="single">
  <ToggleGroupItem value="a">A</ToggleGroupItem>
  <ToggleGroupItem value="b">B</ToggleGroupItem>
  <ToggleGroupItem value="c">C</ToggleGroupItem>
</ToggleGroup>
```

### View code 2

```tsx
import { Bold, Italic, Underline } from "lucide-react"

import {
```

### View code 3

```tsx
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export function ToggleGroupOutline() {
  return (
    <ToggleGroup variant="outline" defaultValue={["all"]}>
      <ToggleGroupItem value="all" aria-label="Toggle all">
        All
      </ToggleGroupItem>
      <ToggleGroupItem value="missed" aria-label="Toggle missed">
        Missed
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
```

### View code 4

```tsx
import {
  ToggleGroup,
  ToggleGroupItem,
```

### View code 5

```tsx
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export function ToggleGroupSpacing() {
  return (
    <ToggleGroup size="sm" defaultValue={["top"]} variant="outline" spacing={2}>
      <ToggleGroupItem value="top" aria-label="Toggle top">
        Top
      </ToggleGroupItem>
      <ToggleGroupItem value="bottom" aria-label="Toggle bottom">
        Bottom
      </ToggleGroupItem>
      <ToggleGroupItem value="left" aria-label="Toggle left">
        Left
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Toggle right">
        Right
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
```

### View code 6

```tsx
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"

import {
```

### View code 7

```tsx
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export function ToggleGroupVertical() {
  return (
    <ToggleGroup
      multiple
      orientation="vertical"
      spacing={1}
      defaultValue={["bold", "italic"]}
    >
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
```

### View code 8

```tsx
import { Bold, Italic, Underline } from "lucide-react"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export function ToggleGroupDisabled() {
  return (
    <ToggleGroup disabled>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
```

### View code 9

```tsx
"use client"

import * as React from "react"
```
## Tooltip

Fuente: https://ui.shadcn.com/docs/components/tooltip


### View code 1

```tsx
import { TooltipProvider } from "@/components/ui/tooltip"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  )
}
```

### View code 2

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
```

### View code 3

```tsx
<Tooltip>
  <TooltipTrigger>Hover</TooltipTrigger>
  <TooltipContent>
    <p>Add to library</p>
  </TooltipContent>
</Tooltip>
```

### View code 4

```tsx
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline">Hover</Button>} />
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  )
}
```

### View code 5

```tsx
import { Button } from "@/components/ui/button"
import {
  Tooltip,
```

### View code 6

```tsx
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function TooltipSides() {
  return (
    <div className="flex flex-wrap gap-2">
      {(["left", "top", "bottom", "right"] as const).map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger render={<Button variant="outline" className="w-fit capitalize">{side}</Button>} />
          <TooltipContent side={side}>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}
```

### View code 7

```tsx
import { SaveIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function TooltipKeyboard() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" size="icon-sm"><SaveIcon /></Button>} />
      <TooltipContent>
        Save Changes <Kbd>S</Kbd>
      </TooltipContent>
    </Tooltip>
  )
}
```

### View code 8

```tsx
import { SaveIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
```

### View code 9

```tsx
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function TooltipDisabled() {
  return (
    <>
      <Tooltip>
        <TooltipTrigger render={<span className="inline-block w-fit"><Button variant="outline" disabled>
            Disabled
          </Button></span>} />
        <TooltipContent>
          <p>This feature is currently unavailable</p>
        </TooltipContent>
      </Tooltip>
    </>
  )
}
```

### View code 10

```tsx
"use client"

import {
```
## Trace

Fuente: https://ui.shadcn.com/docs/components/trace


### View code 1

```tsx
<Trace>
  <TraceLine>
    <TraceIcon>
      <SearchIcon />
    </TraceIcon>
    <TraceTitle>Searched for minimumReleaseAge</TraceTitle>
  </TraceLine>
</Trace>
```

### View code 2

```tsx
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"
```

### View code 3

```tsx
<Trace>
  <TraceCollapsible>
    <TraceCollapsibleTrigger>
      <TraceLine>
        <TraceIcon>
          <TerminalIcon />
        </TraceIcon>
        <TraceTitle>Ran node --version</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>v24.18.0</TraceCollapsibleContent>
  </TraceCollapsible>
</Trace>
```

### View code 4

```tsx
const [open, setOpen] = React.useState<boolean>()

<TraceCollapsible
  open={open ?? running}
  onOpenChange={setOpen}
>
  <TraceCollapsibleTrigger>
    <TraceLine status={running ? "running" : undefined}>…</TraceLine>
  </TraceCollapsibleTrigger>
  <TraceCollapsibleContent>{text}</TraceCollapsibleContent>
</TraceCollapsible>
```

### View code 5

```tsx
<a href="https://docs.astro.build" target="_blank" rel="noreferrer">
  <TraceLine>
    <TraceTitle>
      Install Astro
      <span className="sr-only"> (opens in a new tab)</span>
    </TraceTitle>
    <TraceIcon>
      <ArrowUpRightIcon />
    </TraceIcon>
  </TraceLine>
</a>
```

### View code 6

```tsx
<Dialog>
  <DialogTrigger>
    <TraceLine>
      <TraceTitle>Searched the web for cache keys</TraceTitle>
      <TraceIcon>
        <ChevronRightIcon />
      </TraceIcon>
    </TraceLine>
  </DialogTrigger>
  <DialogContent>…</DialogContent>
</Dialog>
```

### View code 7

```tsx
import { GitBranchIcon } from "lucide-react"

import {
  Trace,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"

export function TraceStatic() {
  return (
    <Trace className="max-w-sm">
      <TraceLine>
        <TraceIcon>
          <GitBranchIcon />
        </TraceIcon>
        <TraceTitle>Created branch fix/frozen-lockfile</TraceTitle>
      </TraceLine>
    </Trace>
  )
}
```

### View code 8

```tsx
import { GitBranchIcon } from "lucide-react"

import {
```

### View code 9

```tsx
import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleIcon,
  LoaderCircleIcon,
} from "lucide-react"

import {
  Trace,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"

export function TraceStatus() {
  return (
    <Trace className="max-w-sm">
      <TraceLine>
        <TraceIcon>
          <CircleCheckIcon />
        </TraceIcon>
        <TraceTitle>Ran pnpm install</TraceTitle>
      </TraceLine>
      <TraceLine status="error">
        <TraceIcon>
          <CircleAlertIcon />
        </TraceIcon>
        <TraceTitle>Failed to run pnpm lint</TraceTitle>
      </TraceLine>
      <TraceLine status="running">
        <TraceIcon>
          <LoaderCircleIcon className="animate-spin" />
        </TraceIcon>
        <TraceTitle>Running pnpm build</TraceTitle>
      </TraceLine>
      <TraceLine status="pending">
        <TraceIcon>
          <CircleIcon />
        </TraceIcon>
        <TraceTitle>Run pnpm test</TraceTitle>
      </TraceLine>
    </Trace>
  )
}
```

### View code 10

```tsx
import {
  CircleAlertIcon,
  CircleCheckIcon,
```

### View code 11

```tsx
import { FilePenIcon, SearchIcon, TerminalIcon } from "lucide-react"

import {
  Trace,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"

export function TraceDescriptionDemo() {
  return (
    <Trace className="max-w-sm">
      <TraceLine>
        <TraceIcon>
          <FilePenIcon />
        </TraceIcon>
        <TraceTitle>
          Edited components/settings/notification-preferences-form.tsx
        </TraceTitle>
        <TraceDescription className="font-mono">+48 −12</TraceDescription>
      </TraceLine>
      <TraceLine>
        <TraceIcon>
          <TerminalIcon />
        </TraceIcon>
        <TraceTitle>Ran pnpm test</TraceTitle>
        <TraceDescription>14s</TraceDescription>
      </TraceLine>
      <TraceLine>
        <TraceIcon>
          <SearchIcon />
        </TraceIcon>
        <TraceTitle>Searched for useChat</TraceTitle>
        <TraceDescription>8 results</TraceDescription>
      </TraceLine>
    </Trace>
  )
}
```

### View code 12

```tsx
import { FilePenIcon, SearchIcon, TerminalIcon } from "lucide-react"

import {
```

### View code 13

```tsx
import { TerminalIcon } from "lucide-react"

import { CodeBlock, CodeBlockContent } from "@/components/ui/code-block"
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"

export function TraceCollapsibleDemo() {
  return (
    <div className="w-full max-w-sm">
      <TraceCollapsible>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <TerminalIcon />
            </TraceIcon>
            <TraceTitle>Ran node --version</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <CodeBlock size="sm">
            <CodeBlockContent wrap className="max-h-64">
              {"$ node --version\
v24.18.0"}
            </CodeBlockContent>
          </CodeBlock>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </div>
  )
}
```

### View code 14

```tsx
import { TerminalIcon } from "lucide-react"

import { CodeBlock, CodeBlockContent } from "@/components/ui/code-block"
```

### View code 15

```tsx
"use client"

import * as React from "react"
```

### View code 16

```tsx
import {
  ArrowUpRightIcon,
  ChevronRightIcon,
```

### View code 17

```tsx
import { ArrowUpRightIcon, ChevronRightIcon, GlobeIcon } from "lucide-react"

import {
```

### View code 18

```tsx
import { ChevronRightIcon, FolderSearchIcon } from "lucide-react"

import {
```

### View code 19

```tsx
import { FileTextIcon, SearchIcon, TerminalIcon } from "lucide-react"

import {
  Trace,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"

export function TraceGroupDemo() {
  return (
    <Trace className="max-w-sm">
      <TraceLine>
        <TraceIcon>
          <SearchIcon />
        </TraceIcon>
        <TraceTitle>Searched for minimumReleaseAge</TraceTitle>
      </TraceLine>
      <TraceLine>
        <TraceIcon>
          <FileTextIcon />
        </TraceIcon>
        <TraceTitle>Read pnpm-workspace.yaml</TraceTitle>
      </TraceLine>
      <TraceLine>
        <TraceIcon>
          <TerminalIcon />
        </TraceIcon>
        <TraceTitle>Ran pnpm install</TraceTitle>
      </TraceLine>
    </Trace>
  )
}
```

### View code 20

```tsx
import { FileTextIcon, SearchIcon, TerminalIcon } from "lucide-react"

import {
```

### View code 21

```tsx
import { ArrowUpRightIcon, GlobeIcon } from "lucide-react"

import {
```

### View code 22

```tsx
import { ChevronRightIcon, FileTextIcon, SearchIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
```

### View code 23

```tsx
import {
  ChevronRightIcon,
  FilePenIcon,
```

## Typography

Fuente: https://ui.shadcn.com/docs/components/typography


### View code 1

```tsx
.typeset-docs {
  --typeset-font-body: var(--font-geist);
  --typeset-font-heading: var(--font-geist);
  --typeset-font-mono: var(--font-geist-mono);
  --typeset-size: 15px;
  --typeset-leading: 1.75;
  --typeset-flow: 1.25em;
}
```

### View code 2

```tsx
@import "tailwindcss";
@import "./typeset.css";
```

### View code 3

```tsx
<div className="typeset typeset-docs">
  <YourMarkdownRenderer>{content}</YourMarkdownRenderer>
</div>
```

### View code 4

```tsx
.typeset {
  --typeset-font-body: inherit;
  --typeset-font-heading: var(--font-heading);
  --typeset-font-mono: var(--font-mono);

  --typeset-size: 1em; /* body font-size */
  --typeset-leading: 1.75; /* line-height */
  --typeset-flow: 1.25em; /* space between blocks */
}
```

### View code 5

```tsx
.typeset-chat {
  --typeset-flow: 1em;
  --typeset-leading: 1.6;
}

.typeset-docs {
  --typeset-size: 15px;
  --typeset-flow: 1.5em;
}
```

### View code 6

```tsx
<div className="typeset typeset-chat">{message}</div>
<article className="typeset typeset-docs">{page}</article>
```

### View code 7

```tsx
<article className="typeset [--typeset-flow:1.75em]">...</article>
```

### View code 8

```tsx
.typeset-large {
  --typeset-size: 16px;
  --typeset-leading: 2;
  --typeset-flow: 2em;
}
```

### View code 9

```tsx
<div className="typeset-scroll">
  <table>...</table>
</div>
```

### View code 10

```tsx
<div className="typeset typeset-docs">
  <p className="text-lg">...</p>
</div>
```

### View code 11

```tsx
<div className="typeset">
  <p>Styled prose.</p>
  <Card className="not-typeset">Untouched component.</Card>
</div>
```
## AI Elements

Fuente: https://ui.shadcn.com/docs/ai-elements/ai-elements


## Introduction

Fuente: https://ui.shadcn.com/docs


## Chain of Thought

Fuente: https://ui.shadcn.com/docs/ai-elements/chain-of-thought


## Chat

Fuente: https://ui.shadcn.com/docs/ai-elements/chat


## Checkpoint

Fuente: https://ui.shadcn.com/docs/ai-elements/checkpoint


## Confirmation

Fuente: https://ui.shadcn.com/docs/ai-elements/confirmation


## Context

Fuente: https://ui.shadcn.com/docs/ai-elements/context


## File Tree

Fuente: https://ui.shadcn.com/docs/ai-elements/file-tree


## Inline Citation

Fuente: https://ui.shadcn.com/docs/ai-elements/inline-citation


## Model Selector

Fuente: https://ui.shadcn.com/docs/ai-elements/model-selector


## Plan

Fuente: https://ui.shadcn.com/docs/ai-elements/plan


## Prompt Input

Fuente: https://ui.shadcn.com/docs/ai-elements/prompt-input


## Queue

Fuente: https://ui.shadcn.com/docs/ai-elements/queue


## Reasoning

Fuente: https://ui.shadcn.com/docs/ai-elements/reasoning


## Sources

Fuente: https://ui.shadcn.com/docs/ai-elements/sources


## Stack Trace

Fuente: https://ui.shadcn.com/docs/ai-elements/stack-trace


## Subagent

Fuente: https://ui.shadcn.com/docs/ai-elements/subagent


## Suggestion

Fuente: https://ui.shadcn.com/docs/ai-elements/suggestion


## Task

Fuente: https://ui.shadcn.com/docs/ai-elements/task


## Terminal

Fuente: https://ui.shadcn.com/docs/ai-elements/terminal


## Test Results

Fuente: https://ui.shadcn.com/docs/ai-elements/test-results


## Tool

Fuente: https://ui.shadcn.com/docs/ai-elements/tool


## Get Started

Fuente: https://ui.shadcn.com/docs/getting-started


## Installation

Fuente: https://ui.shadcn.com/docs/installation


## components.json

Fuente: https://ui.shadcn.com/docs/components-json


### View code 1

```tsx
# Install from a configured registry
npx shadcn@latest add @v0/dashboard

# Install from private registry
npx shadcn@latest add @private/button

# Install multiple resources
npx shadcn@latest add @acme/header @internal/auth-utils
```

## Package Imports

Fuente: https://ui.shadcn.com/docs/components/package-imports


## Theming

Fuente: https://ui.shadcn.com/docs/theming


### View code 1

```tsx
<div className="bg-background text-foreground" />
```

### View code 2

```tsx
<div className="bg-primary text-primary-foreground">Hello</div>
```

### View code 3

```tsx
<div className="bg-warning text-warning-foreground" />
```

### View code 4

```tsx
<div className="bg-zinc-950 text-zinc-50 dark:bg-white dark:text-zinc-950" />
```

## Typeset

Fuente: https://ui.shadcn.com/docs/typeset


### View code 1

```tsx
.typeset-docs {
  --typeset-font-body: var(--font-geist);
  --typeset-font-heading: var(--font-geist);
  --typeset-font-mono: var(--font-geist-mono);
  --typeset-size: 15px;
  --typeset-leading: 1.75;
  --typeset-flow: 1.25em;
}
```

### View code 2

```tsx
@import "tailwindcss";
@import "./typeset.css";
```

### View code 3

```tsx
<div className="typeset typeset-docs">
  <YourMarkdownRenderer>{content}</YourMarkdownRenderer>
</div>
```

### View code 4

```tsx
.typeset {
  --typeset-font-body: inherit;
  --typeset-font-heading: var(--font-heading);
  --typeset-font-mono: var(--font-mono);

  --typeset-size: 1em; /* body font-size */
  --typeset-leading: 1.75; /* line-height */
  --typeset-flow: 1.25em; /* space between blocks */
}
```

### View code 5

```tsx
.typeset-chat {
  --typeset-flow: 1em;
  --typeset-leading: 1.6;
}

.typeset-docs {
  --typeset-size: 15px;
  --typeset-flow: 1.5em;
}
```

### View code 6

```tsx
<div className="typeset typeset-chat">{message}</div>
<article className="typeset typeset-docs">{page}</article>
```

### View code 7

```tsx
<article className="typeset [--typeset-flow:1.75em]">...</article>
```

### View code 8

```tsx
.typeset-large {
  --typeset-size: 16px;
  --typeset-leading: 2;
  --typeset-flow: 2em;
}
```

### View code 9

```tsx
<div className="typeset-scroll">
  <table>...</table>
</div>
```

### View code 10

```tsx
<div className="typeset typeset-docs">
  <p className="text-lg">...</p>
</div>
```

### View code 11

```tsx
<div className="typeset">
  <p>Styled prose.</p>
  <Card className="not-typeset">Untouched component.</Card>
</div>
```

## Dark Mode

Fuente: https://ui.shadcn.com/docs/dark-mode


## CLI

Fuente: https://ui.shadcn.com/docs/cli


### View code 1

```tsx
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### View code 2

```tsx
export { cn } from "cn"
```

### View code 3

```tsx
# Migrate a specific file.
npx shadcn@latest migrate cn src/lib/utils.ts

# Migrate files matching a glob pattern.
npx shadcn@latest migrate cn "src/**/*.{ts,tsx}"
```

### View code 4

```tsx
# Migrate a specific file.
npx shadcn@latest migrate icons src/components/ui/button.tsx --from lucide --to tabler

# Migrate files matching a glob pattern.
npx shadcn@latest migrate icons "src/components/**" --from lucide --to tabler
```

### View code 5

```tsx
# Migrate a specific file
npx shadcn@latest migrate rtl src/components/ui/button.tsx

# Migrate files matching a glob pattern
npx shadcn@latest migrate rtl "src/components/ui/**"
```

### View code 6

```tsx
import * as DialogPrimitive from "@radix-ui/react-dialog"
import * as SelectPrimitive from "@radix-ui/react-select"
```

### View code 7

```tsx
import { Dialog as DialogPrimitive, Select as SelectPrimitive } from "radix-ui"
```

### View code 8

```tsx
# Migrate a specific file.
npx shadcn@latest migrate radix src/components/ui/dialog.tsx

# Migrate files matching a glob pattern.
npx shadcn@latest migrate radix "src/components/ui/**"
```

### View code 9

```tsx
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
```

## Monorepo

Fuente: https://ui.shadcn.com/docs/monorepo


### View code 1

```tsx
import { Button } from "@workspace/ui/components/button"
```

### View code 2

```tsx
import { useTheme } from "@workspace/ui/hooks/use-theme"
import { cn } from "@workspace/ui/lib/utils"
```

## Skills

Fuente: https://ui.shadcn.com/docs/skills


## JavaScript

Fuente: https://ui.shadcn.com/docs/javascript


## Figma

Fuente: https://ui.shadcn.com/docs/figma


## llms.txt

Fuente: https://ui.shadcn.com/llms.txt


## Legacy Docs

Fuente: https://ui.shadcn.com/docs/legacy


## @shadcn/react

Fuente: https://ui.shadcn.com/docs/react


## @shadcn/helpers

Fuente: https://ui.shadcn.com/docs/components/shadcn-helpers


## AI SDK

Fuente: https://ui.shadcn.com/docs/ai-sdk


## TanStack AI

Fuente: https://ui.shadcn.com/docs/tanstack-ai


## Forms

Fuente: https://ui.shadcn.com/docs/forms


## React Hook Form

Fuente: https://ui.shadcn.com/docs/forms/react-hook-form


### View code 1

```tsx
<Controller
  name="title"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>Bug Title</FieldLabel>
      <Input
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder="Login button not working on mobile"
        autoComplete="off"
      />
      <FieldDescription>
        Provide a concise title for your bug report.
      </FieldDescription>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
```

### View code 2

```tsx
import * as z from "zod"

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
})
```

### View code 3

```tsx
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
})

export function BugReportForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* ... */}
      {/* Build the form here */}
      {/* ... */}
    </form>
  )
}
```

### View code 4

```tsx
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
})

export function ExampleForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })
}
```

### View code 5

```tsx
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  mode: "onChange",
})
```

### View code 6

```tsx
<Controller
  name="email"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
      <Input
        {...field}
        id={field.name}
        type="email"
        aria-invalid={fieldState.invalid}
      />
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
```

### View code 7

```tsx
<Controller
  name="name"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>Name</FieldLabel>
      <Input {...field} id={field.name} aria-invalid={fieldState.invalid} />
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
```

### View code 8

```tsx
<Controller
  name="about"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor="form-rhf-textarea-about">More about you</FieldLabel>
      <Textarea
        {...field}
        id="form-rhf-textarea-about"
        aria-invalid={fieldState.invalid}
        placeholder="I'm a software engineer..."
        className="min-h-[120px]"
      />
      <FieldDescription>
        Tell us more about yourself. This will be used to help us personalize
        your experience.
      </FieldDescription>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
```

### View code 9

```tsx
<Controller
  name="twoFactor"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field orientation="horizontal" data-invalid={fieldState.invalid}>
      <FieldContent>
        <FieldLabel htmlFor="form-rhf-switch-twoFactor">
          Multi-factor authentication
        </FieldLabel>
        <FieldDescription>
          Enable multi-factor authentication to secure your account.
        </FieldDescription>
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </FieldContent>
      <Switch
        id="form-rhf-switch-twoFactor"
        name={field.name}
        checked={field.value}
        onCheckedChange={field.onChange}
        aria-invalid={fieldState.invalid}
      />
    </Field>
  )}
/>
```

### View code 10

```tsx
<Button type="button" variant="outline" onClick={() => form.reset()}>
  Reset
</Button>
```

### View code 11

```tsx
import { useFieldArray, useForm } from "react-hook-form"

export function ExampleForm() {
  const form = useForm({
    // ... form config
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "emails",
  })
}
```

### View code 12

```tsx
<FieldSet className="gap-4">
  <FieldLegend variant="label">Email Addresses</FieldLegend>
  <FieldDescription>
    Add up to 5 email addresses where we can contact you.
  </FieldDescription>
  <FieldGroup className="gap-4">{/* Array items go here */}</FieldGroup>
</FieldSet>
```

### View code 13

```tsx
<Button
  type="button"
  variant="outline"
  size="sm"
  onClick={() => append({ address: "" })}
  disabled={fields.length >= 5}
>
  Add Email Address
</Button>
```

### View code 14

```tsx
const formSchema = z.object({
  emails: z
    .array(
      z.object({
        address: z.string().email("Enter a valid email address."),
      })
    )
    .min(1, "Add at least one email address.")
    .max(5, "You can add up to 5 email addresses."),
})
```

## TanStack Form

Fuente: https://ui.shadcn.com/docs/forms/tanstack-form


### View code 1

```tsx
import * as z from "zod"

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
})
```

### View code 2

```tsx
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"

const formSchema = z.object({
  // ...
})

export function BugReportForm() {
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      toast.success("Form submitted successfully")
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      {/* ... */}
    </form>
  )
}
```

### View code 3

```tsx
import { useForm } from "@tanstack/react-form"

const formSchema = z.object({
  // ...
})

export function BugReportForm() {
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value)
    },
  })

  return <form onSubmit={/* ... */}>{/* ... */}</form>
}
```

### View code 4

```tsx
const form = useForm({
  defaultValues: {
    title: "",
    description: "",
  },
  validators: {
    onSubmit: formSchema,
    onChange: formSchema,
    onBlur: formSchema,
  },
})
```

### View code 5

```tsx
<form.Field
  name="email"
  children={(field) => {
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

    return (
      <Field data-invalid={isInvalid}>
        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
        <Input
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          type="email"
          aria-invalid={isInvalid}
        />
        {isInvalid && <FieldError errors={field.state.meta.errors} />}
      </Field>
    )
  }}
/>
```

### View code 6

```tsx
<form.Field
  name="username"
  children={(field) => {
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
    return (
      <Field data-invalid={isInvalid}>
        <FieldLabel htmlFor="form-tanstack-input-username">Username</FieldLabel>
        <Input
          id="form-tanstack-input-username"
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          aria-invalid={isInvalid}
          placeholder="shadcn"
          autoComplete="username"
        />
        <FieldDescription>
          This is your public display name. Must be between 3 and 10 characters.
          Must only contain letters, numbers, and underscores.
        </FieldDescription>
        {isInvalid && <FieldError errors={field.state.meta.errors} />}
      </Field>
    )
  }}
/>
```

### View code 7

```tsx
<form.Field
  name="about"
  children={(field) => {
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
    return (
      <Field data-invalid={isInvalid}>
        <FieldLabel htmlFor="form-tanstack-textarea-about">
          More about you
        </FieldLabel>
        <Textarea
          id="form-tanstack-textarea-about"
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          aria-invalid={isInvalid}
          placeholder="I'm a software engineer..."
          className="min-h-[120px]"
        />
        <FieldDescription>
          Tell us more about yourself. This will be used to help us personalize
          your experience.
        </FieldDescription>
        {isInvalid && <FieldError errors={field.state.meta.errors} />}
      </Field>
    )
  }}
/>
```

### View code 8

```tsx
<form.Field
  name="twoFactor"
  children={(field) => {
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
    return (
      <Field orientation="horizontal" data-invalid={isInvalid}>
        <FieldContent>
          <FieldLabel htmlFor="form-tanstack-switch-twoFactor">
            Multi-factor authentication
          </FieldLabel>
          <FieldDescription>
            Enable multi-factor authentication to secure your account.
          </FieldDescription>
          {isInvalid && <FieldError errors={field.state.meta.errors} />}
        </FieldContent>
        <Switch
          id="form-tanstack-switch-twoFactor"
          name={field.name}
          checked={field.state.value}
          onCheckedChange={field.handleChange}
          aria-invalid={isInvalid}
        />
      </Field>
    )
  }}
/>
```

### View code 9

```tsx
<Button type="button" variant="outline" onClick={() => form.reset()}>
  Reset
</Button>
```

### View code 10

```tsx
<form.Field
  name="emails"
  mode="array"
  children={(field) => {
    return (
      <FieldSet>
        <FieldLegend variant="label">Email Addresses</FieldLegend>
        <FieldDescription>
          Add up to 5 email addresses where we can contact you.
        </FieldDescription>
        <FieldGroup>
          {field.state.value.map((_, index) => (
            // Nested field for each array item
          ))}
        </FieldGroup>
      </FieldSet>
    )
  }}
/>
```

### View code 11

```tsx
<Button
  type="button"
  variant="outline"
  size="sm"
  onClick={() => field.pushValue({ address: "" })}
  disabled={field.state.value.length >= 5}
>
  Add Email Address
</Button>
```

### View code 12

```tsx
const formSchema = z.object({
  emails: z
    .array(
      z.object({
        address: z.string().email("Enter a valid email address."),
      })
    )
    .min(1, "Add at least one email address.")
    .max(5, "You can add up to 5 email addresses."),
})
```

## Formisch

Fuente: https://ui.shadcn.com/docs/forms/formisch


### View code 1

```tsx
import { getInput, insert, reset, submit } from "@formisch/react"
```

### View code 2

```tsx
<Form of={form} onSubmit={handleSubmit}>
  <FieldGroup>
    <FormischField of={form} path={["title"]}>
      {(field) => (
        <Field data-invalid={field.errors !== null}>
          <FieldLabel htmlFor="form-title">Bug Title</FieldLabel>
          <Input
            {...field.props}
            id="form-title"
            value={field.input}
            aria-invalid={field.errors !== null}
            placeholder="Login button not working on mobile"
            autoComplete="off"
          />
          <FieldDescription>
            Provide a concise title for your bug report.
          </FieldDescription>
          {field.errors && (
            <FieldError errors={field.errors.map((message) => ({ message }))} />
          )}
        </Field>
      )}
    </FormischField>
  </FieldGroup>
</Form>
```

### View code 3

```tsx
import * as v from "valibot"

const FormSchema = v.object({
  title: v.pipe(
    v.string(),
    v.minLength(5, "Bug title must be at least 5 characters."),
    v.maxLength(32, "Bug title must be at most 32 characters.")
  ),
  description: v.pipe(
    v.string(),
    v.minLength(20, "Description must be at least 20 characters."),
    v.maxLength(100, "Description must be at most 100 characters.")
  ),
})
```

### View code 4

```tsx
import { Form, Field as FormischField, useForm } from "@formisch/react"
import type { SubmitHandler } from "@formisch/react"
import * as v from "valibot"

const FormSchema = v.object({
  title: v.pipe(
    v.string(),
    v.minLength(5, "Bug title must be at least 5 characters."),
    v.maxLength(32, "Bug title must be at most 32 characters.")
  ),
  description: v.pipe(
    v.string(),
    v.minLength(20, "Description must be at least 20 characters."),
    v.maxLength(100, "Description must be at most 100 characters.")
  ),
})

export function BugReportForm() {
  const form = useForm({
    schema: FormSchema,
    initialInput: {
      title: "",
      description: "",
    },
  })

  const handleSubmit: SubmitHandler<typeof FormSchema> = (output) => {
    // Do something with the validated form values.
    console.log(output)
  }

  return (
    <Form of={form} onSubmit={handleSubmit}>
      {/* ... */}
      {/* Build the form here */}
      {/* ... */}
    </Form>
  )
}
```

### View code 5

```tsx
import { useForm } from "@formisch/react"

const FormSchema = v.object({
  title: v.string(),
  description: v.optional(v.string()),
})

export function ExampleForm() {
  const form = useForm({
    schema: FormSchema,
    initialInput: {
      title: "",
      description: "",
    },
  })
}
```

### View code 6

```tsx
const form = useForm({
  schema: FormSchema,
  validate: "blur",
  revalidate: "input",
})
```

### View code 7

```tsx
<FormischField of={form} path={["email"]}>
  {(field) => (
    <Field data-invalid={field.errors !== null}>
      <FieldLabel htmlFor="form-email">Email</FieldLabel>
      <Input
        {...field.props}
        id="form-email"
        value={field.input}
        type="email"
        aria-invalid={field.errors !== null}
      />
      {field.errors && (
        <FieldError errors={field.errors.map((message) => ({ message }))} />
      )}
    </Field>
  )}
</FormischField>
```

### View code 8

```tsx
<FormischField of={form} path={["username"]}>
  {(field) => (
    <Field data-invalid={field.errors !== null}>
      <FieldLabel htmlFor="form-username">Username</FieldLabel>
      <Input
        {...field.props}
        id="form-username"
        value={field.input}
        aria-invalid={field.errors !== null}
      />
      {field.errors && (
        <FieldError errors={field.errors.map((message) => ({ message }))} />
      )}
    </Field>
  )}
</FormischField>
```

### View code 9

```tsx
<FormischField of={form} path={["about"]}>
  {(field) => (
    <Field data-invalid={field.errors !== null}>
      <FieldLabel htmlFor="form-about">More about you</FieldLabel>
      <Textarea
        {...field.props}
        id="form-about"
        value={field.input}
        aria-invalid={field.errors !== null}
        placeholder="I'm a software engineer..."
        className="min-h-[120px]"
      />
      <FieldDescription>
        Tell us more about yourself. This will be used to help us personalize
        your experience.
      </FieldDescription>
      {field.errors && (
        <FieldError errors={field.errors.map((message) => ({ message }))} />
      )}
    </Field>
  )}
</FormischField>
```

### View code 10

```tsx
<FormischField of={form} path={["language"]}>
  {(field) => (
    <Field orientation="responsive" data-invalid={field.errors !== null}>
      <FieldContent>
        <FieldLabel htmlFor="form-language">Spoken Language</FieldLabel>
        <FieldDescription>
          For best results, select the language you speak.
        </FieldDescription>
        {field.errors && (
          <FieldError errors={field.errors.map((message) => ({ message }))} />
        )}
      </FieldContent>
      <Select value={field.input} onValueChange={field.onChange}>
        <SelectTrigger
          id="form-language"
          aria-invalid={field.errors !== null}
          className="min-w-[120px]"
        >
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent position="item-aligned">
          <SelectItem value="auto">Auto</SelectItem>
          <SelectItem value="en">English</SelectItem>
        </SelectContent>
      </Select>
    </Field>
  )}
</FormischField>
```

### View code 11

```tsx
<FormischField of={form} path={["twoFactor"]}>
  {(field) => (
    <Field orientation="horizontal" data-invalid={field.errors !== null}>
      <FieldContent>
        <FieldLabel htmlFor="form-twoFactor">
          Multi-factor authentication
        </FieldLabel>
        <FieldDescription>
          Enable multi-factor authentication to secure your account.
        </FieldDescription>
        {field.errors && (
          <FieldError errors={field.errors.map((message) => ({ message }))} />
        )}
      </FieldContent>
      <Switch
        id="form-twoFactor"
        checked={field.input ?? false}
        onCheckedChange={field.onChange}
        aria-invalid={field.errors !== null}
      />
    </Field>
  )}
</FormischField>
```

### View code 12

```tsx
<Button type="button" variant="outline" onClick={() => reset(form)}>
  Reset
</Button>
```

### View code 13

```tsx
import {
  Field as FormischField,
  FieldArray,
  insert,
  remove,
} from "@formisch/react"

export function ExampleForm() {
  // ... form config

  return (
    <FieldArray of={form} path={["emails"]}>
      {(fieldArray) => (
        <FieldGroup className="gap-4">
          {fieldArray.items.map((item, index) => (
            <FormischField
              key={item}
              of={form}
              path={["emails", index, "address"]}
            >
              {(field) => /* ... */}
            </FormischField>
          ))}
        </FieldGroup>
      )}
    </FieldArray>
  )
}
```

### View code 14

```tsx
<FieldSet className="gap-4">
  <FieldLegend variant="label">Email Addresses</FieldLegend>
  <FieldDescription>
    Add up to 5 email addresses where we can contact you.
  </FieldDescription>
  <FieldGroup className="gap-4">{/* Array items go here */}</FieldGroup>
</FieldSet>
```

### View code 15

```tsx
<Button
  type="button"
  variant="outline"
  size="sm"
  onClick={() =>
    insert(form, { path: ["emails"], initialInput: { address: "" } })
  }
  disabled={fieldArray.items.length >= 5}
>
  Add Email Address
</Button>
```

### View code 16

```tsx
import { remove } from "@formisch/react"

{
  fieldArray.items.length > 1 && (
    <InputGroupAddon align="inline-end">
      <InputGroupButton
        type="button"
        variant="ghost"
        size="icon-xs"
        onClick={() => remove(form, { path: ["emails"], at: index })}
        aria-label={`Remove email ${index + 1}`}
      >
        <XIcon />
      </InputGroupButton>
    </InputGroupAddon>
  )
}
```

### View code 17

```tsx
const FormSchema = v.object({
  emails: v.pipe(
    v.array(
      v.object({
        address: v.pipe(
          v.string(),
          v.nonEmpty("Enter an email address."),
          v.email("Enter a valid email address.")
        ),
      })
    ),
    v.minLength(1, "Add at least one email address."),
    v.maxLength(5, "You can add up to 5 email addresses.")
  ),
})
```

### View code 18

```tsx
"use client"

import * as React from "react"
```

## Utilities

Fuente: https://ui.shadcn.com/docs/utilities


## scroll-fade

Fuente: https://ui.shadcn.com/docs/utilities/scroll-fade


## shimmer

Fuente: https://ui.shadcn.com/docs/utilities/shimmer


## Registry

Fuente: https://ui.shadcn.com/docs/registry


## Getting Started

Fuente: https://ui.shadcn.com/docs/registry/getting-started


### View code 1

```tsx
import * as React from "react"

export function Button(props: React.ComponentProps<"button">) {
  return (
    <button
      {...props}
      className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white"
    />
  )
}
```

### View code 2

```tsx
import { loadRegistry } from "shadcn/registry"

export async function GET() {
  try {
    const registry = await loadRegistry()

    return Response.json(registry)
  } catch (error) {
    console.error(error)

    return Response.json({ error: "Failed to load registry." }, { status: 500 })
  }
}
```

### View code 3

```tsx
import { loadRegistryItem, RegistryItemNotFoundError } from "shadcn/registry"

export async function GET(
  _request: Request,
  context: {
    params: Promise<{
      name: string
    }>
  }
) {
  const { name } = await context.params

  try {
    const item = await loadRegistryItem(name)

    return Response.json(item)
  } catch (error) {
    if (error instanceof RegistryItemNotFoundError) {
      return Response.json(
        { error: `Registry item "${name}" was not found.` },
        { status: 404 }
      )
    }

    console.error(error)

    return Response.json(
      { error: "Failed to load registry item." },
      { status: 500 }
    )
  }
}
```

### View code 4

```tsx
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          has: [
            {
              type: "header",
              key: "accept",
              value: "(.*)application/vnd\\\\.shadcn\\\\.v1\\\\+json(.*)",
            },
          ],
          destination: "/r/index.json",
        },
        {
          source: "/",
          has: [
            {
              type: "header",
              key: "user-agent",
              value: "shadcn",
            },
          ],
          destination: "/r/index.json",
        },
      ],
    }
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [{ key: "Vary", value: "Accept, User-Agent" }],
      },
    ]
  },
}

export default nextConfig
```

## GitHub Registries

Fuente: https://ui.shadcn.com/docs/registry/github-registries


## Registry Directory

Fuente: https://ui.shadcn.com/docs/directory


## Registry Health

Fuente: https://ui.shadcn.com/docs/registry/health


## Examples

Fuente: https://ui.shadcn.com/docs/registry/examples


## Namespaces

Fuente: https://ui.shadcn.com/docs/registry/namespace


### View code 1

```tsx
# Install from a specific registry
npx shadcn@latest add @v0/dashboard

# Install multiple resources
npx shadcn@latest add @acme/button @lib/utils @ai/prompt

# Install from URL directly
npx shadcn@latest add https://registry.example.com/button.json

# Install from local file
npx shadcn@latest add ./local-registry/button.json
```

### View code 2

```tsx
# View a resource from a registry
npx shadcn@latest view @acme/button

# View multiple resources
npx shadcn@latest view @v0/dashboard @shadcn/card

# View from URL
npx shadcn@latest view https://registry.example.com/button.json
```

### View code 3

```tsx
# Search a specific registry
npx shadcn@latest search @v0

# Search with query
npx shadcn@latest search @acme --query "auth"

# Search multiple registries
npx shadcn@latest search @v0 @acme @lib

# Limit results
npx shadcn@latest search @v0 --limit 10 --offset 20

# List all items (alias for search)
npx shadcn@latest list @acme
```

## Authentication

Fuente: https://ui.shadcn.com/docs/registry/authentication


### View code 1

```tsx
async function GET(request: NextRequest) {
  const token = extractToken(request)
  const team = await getTeamFromToken(token)

  // Get components for this team.
  const components = await getComponentsForTeam(team)
  return NextResponse.json(components)
}
```

### View code 2

```tsx
async function GET(request: NextRequest) {
  const user = await authenticateUser(request)

  // Get user's style and framework preferences.
  const preferences = await getUserPreferences(user.id)

  // Get personalized component version.
  const component = await getPersonalizedComponent(params.name, preferences)

  return NextResponse.json(component)
}
```

### View code 3

```tsx
interface TemporaryToken {
  token: string
  expiresAt: Date
  scope: string[]
}

async function validateTemporaryToken(token: string) {
  const tokenData = await getTokenData(token)

  if (!tokenData) return false
  if (new Date() > tokenData.expiresAt) return false

  return true
}
```

### View code 4

```tsx
import rateLimit from "express-rate-limit"

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})

app.use("/registry", limiter)
```

### View code 5

```tsx
async function logAccess(request: Request, component: string, userId: string) {
  await db.accessLog.create({
    timestamp: new Date(),
    userId,
    component,
    ip: request.ip,
    userAgent: request.headers["user-agent"],
  })
}
```

### View code 6

```tsx
# Test with curl.
curl -H "Authorization: Bearer your_token" \\
  https://registry.company.com/button.json

# Test with the CLI.
REGISTRY_TOKEN=your_token npx shadcn@latest add @private/button
```

## Dynamic Search

Fuente: https://ui.shadcn.com/docs/registry/dynamic-search


### View code 1

```tsx
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const query = searchParams.get("q")
  const types = searchParams.get("type")?.split(",")
  const limit = Number(searchParams.get("limit") ?? 100)
  const offset = Number(searchParams.get("offset") ?? 0)

  // Filter items using your database or search index.
  const { items, total } = await searchItems({ query, types, limit, offset })

  return NextResponse.json({
    name: "acme",
    homepage: "https://acme.com",
    items,
    pagination: {
      total,
      offset,
      limit,
      hasMore: offset + limit < total,
    },
  })
}
```

### View code 2

```tsx
export async function GET(request: NextRequest) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "")
  const team = await getTeamFromToken(token)

  // Only search items this team can access.
  const { items, total } = await searchItems({
    query: request.nextUrl.searchParams.get("q"),
    team,
  })

  // ...
}
```

### View code 3

```tsx
curl "https://acme.com/r/registry.json?q=button&limit=10"
```

## MCP Server

Fuente: https://ui.shadcn.com/docs/mcp


## Open in v0

Fuente: https://ui.shadcn.com/docs/registry/open-in-v0


### View code 1

```tsx
<OpenInV0Button url="https://example.com/r/hello-world.json" />
```

## FAQ

Fuente: https://ui.shadcn.com/docs/registry/faq


## API Reference

Fuente: https://ui.shadcn.com/docs/api-reference


## registry.json

Fuente: https://ui.shadcn.com/docs/registry/registry-json


## registry-item.json

Fuente: https://ui.shadcn.com/docs/registry/registry-item-json

