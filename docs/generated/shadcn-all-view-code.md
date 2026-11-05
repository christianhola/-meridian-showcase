# Código completo de los botones “View code” de shadcn/ui

Extracción de los bloques de código que alimentan los visores interactivos oficiales.

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

## Button

Fuente: https://ui.shadcn.com/docs/components/button


### View code 1

```tsx
<Button variant="outline">Button</Button>
```

### View code 2

```tsx
@layer base {
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}
```

### View code 3

```tsx
import { ArrowUpIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
```

### View code 4

```tsx
import { ArrowUpIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button variant="outline">Button</Button>
      <Button variant="outline" size="icon" aria-label="Submit">
        <ArrowUpIcon />
      </Button>
    </div>
  )
}
```

### View code 5

```tsx
import { ArrowUpRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
```

### View code 6

```tsx
import { Button } from "@/components/ui/button"

export function ButtonDefault() {
  return <Button>Button</Button>
}
```

### View code 7

```tsx
import { Button } from "@/components/ui/button"

export function ButtonDefault() {
```

### View code 8

```tsx
import { Button } from "@/components/ui/button"

export function ButtonOutline() {
  return <Button variant="outline">Outline</Button>
}
```

### View code 9

```tsx
import { Button } from "@/components/ui/button"

export function ButtonOutline() {
```

### View code 10

```tsx
import { Button } from "@/components/ui/button"

export function ButtonSecondary() {
  return <Button variant="secondary">Secondary</Button>
}
```

### View code 11

```tsx
import { Button } from "@/components/ui/button"

export function ButtonSecondary() {
```

### View code 12

```tsx
import { Button } from "@/components/ui/button"

export function ButtonGhost() {
```

### View code 13

```tsx
import { Button } from "@/components/ui/button"

export function ButtonGhost() {
  return <Button variant="ghost">Ghost</Button>
}
```

### View code 14

```tsx
import { Button } from "@/components/ui/button"

export function ButtonDestructive() {
```

### View code 15

```tsx
import { Button } from "@/components/ui/button"

export function ButtonLink() {
```

### View code 16

```tsx
import { CircleFadingArrowUpIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ButtonIcon() {
  return (
    <Button variant="outline" size="icon">
      <CircleFadingArrowUpIcon />
    </Button>
  )
}
```

### View code 17

```tsx
import { Button } from "@/components/ui/button"

export function ButtonLink() {
  return <Button variant="link">Link</Button>
}
```

### View code 18

```tsx
import { CircleFadingArrowUpIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
```

### View code 19

```tsx
import { IconGitBranch, IconGitFork } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"

export function ButtonWithIcon() {
  return (
    <div className="flex gap-2">
      <Button variant="outline">
        <IconGitBranch data-icon="inline-start" /> New Branch
      </Button>
      <Button variant="outline">
        Fork
        <IconGitFork data-icon="inline-end" />
      </Button>
    </div>
  )
}
```

### View code 20

```tsx
import { ArrowUpIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ButtonRounded() {
  return (
    <div className="flex gap-2">
      <Button className="rounded-full">Get Started</Button>
      <Button variant="outline" size="icon" className="rounded-full">
        <ArrowUpIcon />
      </Button>
    </div>
  )
}
```

### View code 21

```tsx
import { IconGitBranch, IconGitFork } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
```

### View code 22

```tsx
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export function ButtonLoading() {
  return (
    <div className="flex gap-2">
      <Button variant="outline" disabled>
        <Spinner data-icon="inline-start" />
        Generating
      </Button>
      <Button variant="secondary" disabled>
        Downloading
        <Spinner data-icon="inline-start" />
      </Button>
    </div>
  )
}
```

### View code 23

```tsx
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
```

### View code 24

```tsx
"use client"

import * as React from "react"
```

### View code 25

```tsx
import { buttonVariants } from "@/components/ui/button"

export function ButtonRender() {
  return (
    <a
      href="#"
      className={buttonVariants({ variant: "secondary", size: "sm" })}
    >
      Login
    </a>
  )
}
```

### View code 26

```tsx
import { buttonVariants } from "@/components/ui/button"

export function ButtonRender() {
```

### View code 27

```tsx
"use client"

import { ArrowRightIcon, PlusIcon } from "lucide-react"
```

## Button Group

Fuente: https://ui.shadcn.com/docs/components/button-group


### View code 1

```tsx
<ButtonGroup>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</ButtonGroup>
```

### View code 2

```tsx
<ButtonGroup aria-label="Button group">
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</ButtonGroup>
```

### View code 3

```tsx
<ButtonGroup>
  <ButtonGroup />
  <ButtonGroup />
</ButtonGroup>
```

### View code 4

```tsx
<ButtonGroup>
  <Button>Button 1</Button>
  <ButtonGroupSeparator />
  <Button>Button 2</Button>
</ButtonGroup>
```

### View code 5

```tsx
<ButtonGroup>
  <ButtonGroupText>Text</ButtonGroupText>
  <Button>Button</Button>
</ButtonGroup>
```

### View code 6

```tsx
import { ButtonGroupText } from "@/components/ui/button-group"
import { Label } from "@/components/ui/label"

export function ButtonGroupTextDemo() {
  return (
    <ButtonGroup>
      <ButtonGroupText render={<Label htmlFor="name" />}>Text</ButtonGroupText>
      <Input placeholder="Type something here..." id="name" />
    </ButtonGroup>
  )
}
```

### View code 7

```tsx
import { MinusIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

export function ButtonGroupOrientation() {
  return (
    <ButtonGroup
      orientation="vertical"
      aria-label="Media controls"
      className="h-fit"
    >
      <Button variant="outline" size="icon">
        <PlusIcon />
      </Button>
      <Button variant="outline" size="icon">
        <MinusIcon />
      </Button>
    </ButtonGroup>
  )
}
```

### View code 8

```tsx
import { MinusIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
```

### View code 9

```tsx
import { PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
```

### View code 10

```tsx
import { AudioLinesIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
```

### View code 11

```tsx
import { AudioLinesIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function ButtonGroupNested() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="icon">
          <PlusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <InputGroup>
          <InputGroupInput placeholder="Send a message..." />
          <Tooltip>
            <TooltipTrigger render={<InputGroupAddon align="inline-end"><AudioLinesIcon /></InputGroupAddon>} />
            <TooltipContent>Voice Mode</TooltipContent>
          </Tooltip>
        </InputGroup>
      </ButtonGroup>
    </ButtonGroup>
  )
}
```

### View code 12

```tsx
import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group"

export function ButtonGroupSeparatorDemo() {
  return (
    <ButtonGroup>
      <Button variant="secondary" size="sm">
        Copy
      </Button>
      <ButtonGroupSeparator />
      <Button variant="secondary" size="sm">
        Paste
      </Button>
    </ButtonGroup>
  )
}
```

### View code 13

```tsx
import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
```

### View code 14

```tsx
import { IconPlus } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group"

export function ButtonGroupSplit() {
  return (
    <ButtonGroup>
      <Button variant="secondary">Button</Button>
      <ButtonGroupSeparator />
      <Button size="icon" variant="secondary">
        <IconPlus />
      </Button>
    </ButtonGroup>
  )
}
```

### View code 15

```tsx
import { IconPlus } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
```

### View code 16

```tsx
import { SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"

export function ButtonGroupInput() {
  return (
    <ButtonGroup>
      <Input placeholder="Search..." />
      <Button variant="outline" aria-label="Search">
        <SearchIcon />
      </Button>
    </ButtonGroup>
  )
}
```

### View code 17

```tsx
import { SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
```

### View code 18

```tsx
"use client"

import * as React from "react"
```

### View code 19

```tsx
"use client"

import {
```

### View code 20

```tsx
import { BotIcon, ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
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

## Checkbox

Fuente: https://ui.shadcn.com/docs/components/checkbox


### View code 1

```tsx
<Checkbox />
```

### View code 2

```tsx
import * as React from "react"

export function Example() {
  const [checked, setChecked] = React.useState(false)

  return <Checkbox checked={checked} onCheckedChange={setChecked} />
}
```

### View code 3

```tsx
"use client"

import { Checkbox } from "@/components/ui/checkbox"
```

### View code 4

```tsx
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

export function CheckboxInvalid() {
  return (
    <FieldGroup className="mx-auto w-56">
      <Field orientation="horizontal" data-invalid>
        <Checkbox
          id="terms-checkbox-invalid"
          name="terms-checkbox-invalid"
          aria-invalid
        />
        <FieldLabel htmlFor="terms-checkbox-invalid">
          Accept terms and conditions
        </FieldLabel>
      </Field>
    </FieldGroup>
  )
}
```

### View code 5

```tsx
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
```

### View code 6

```tsx
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

export function CheckboxBasic() {
  return (
    <FieldGroup className="mx-auto w-56">
      <Field orientation="horizontal">
        <Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" />
        <FieldLabel htmlFor="terms-checkbox-basic">
          Accept terms and conditions
        </FieldLabel>
      </Field>
    </FieldGroup>
  )
}
```

### View code 7

```tsx
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

export function CheckboxDescription() {
  return (
    <FieldGroup className="mx-auto w-72">
      <Field orientation="horizontal">
        <Checkbox
          id="terms-checkbox-desc"
          name="terms-checkbox-desc"
          defaultChecked
        />
        <FieldContent>
          <FieldLabel htmlFor="terms-checkbox-desc">
            Accept terms and conditions
          </FieldLabel>
          <FieldDescription>
            By clicking this checkbox, you agree to the terms and conditions.
          </FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
  )
}
```

### View code 8

```tsx
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
```

### View code 9

```tsx
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

export function CheckboxDisabled() {
  return (
    <FieldGroup className="mx-auto w-56">
      <Field orientation="horizontal" data-disabled>
        <Checkbox
          id="toggle-checkbox-disabled"
          name="toggle-checkbox-disabled"
          disabled
        />
        <FieldLabel htmlFor="toggle-checkbox-disabled">
          Enable notifications
        </FieldLabel>
      </Field>
    </FieldGroup>
  )
}
```

### View code 10

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

## Calendar

Fuente: https://ui.shadcn.com/docs/components/calendar


### View code 1

```tsx
const [date, setDate] = React.useState<Date | undefined>(new Date())

return (
  <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    className="rounded-lg border"
  />
)
```

### View code 2

```tsx
export function CalendarWithTimezone() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [timeZone, setTimeZone] = React.useState<string | undefined>(undefined)

  React.useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
  }, [])

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      timeZone={timeZone}
    />
  )
}
```

### View code 3

```tsx
<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-lg border [--cell-size:--spacing(11)] md:[--cell-size:--spacing(12)]"
/>
```

### View code 4

```tsx
<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-lg border [--cell-size:2.75rem] md:[--cell-size:3rem]"
/>
```

### View code 5

```tsx
import { arSA } from "react-day-picker/locale"

;<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  locale={arSA}
  dir="rtl"
/>
```

### View code 6

```tsx
import {
    DayPicker,
    getDefaultClassNames,
    type DayButton,
+   type Locale,
  } from "react-day-picker"
```

### View code 7

```tsx
function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    captionLayout = "label",
    buttonVariant = "ghost",
+   locale,
    formatters,
    components,
    ...props
  }: React.ComponentProps<typeof DayPicker> & {
    buttonVariant?: React.ComponentProps<typeof Button>["variant"]
  }) {
```

### View code 8

```tsx
import { enUS } from "react-day-picker/locale"

;<Calendar mode="single" selected={date} onSelect={setDate} locale={enUS} />
```

### View code 9

```tsx
<DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(...)}
      captionLayout={captionLayout}
+     locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
-         date.toLocaleString("default", { month: "short" }),
+         date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters,
      }}
```

### View code 10

```tsx
function CalendarDayButton({
    className,
    day,
    modifiers,
+   locale,
    ...props
- }: React.ComponentProps<typeof DayButton>) {
+ }: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
```

### View code 11

```tsx
<Button
      variant="ghost"
      size="icon"
-     data-day={day.date.toLocaleDateString()}
+     data-day={day.date.toLocaleDateString(locale?.code)}
      ...
    />
```

### View code 12

```tsx
"use client"

import * as React from "react"
```

### View code 13

```tsx
"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"

export function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-lg border"
      captionLayout="dropdown"
    />
  )
}
```

### View code 14

```tsx
"use client"

import { Calendar } from "@/components/ui/calendar"

export function CalendarBasic() {
  return <Calendar mode="single" className="rounded-lg border" />
}
```

### View code 15

```tsx
"use client"

import { Calendar } from "@/components/ui/calendar"
```

### View code 16

```tsx
"use client"

import * as React from "react"
import { addDays } from "date-fns"
import { type DateRange } from "react-day-picker"

import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"

export function CalendarRange() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 12),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
  })

  return (
    <Calendar
      mode="range"
      defaultMonth={dateRange?.from}
      selected={dateRange}
      onSelect={setDateRange}
      numberOfMonths={2}
      className="rounded-lg border"
    />
  )
}
```

### View code 17

```tsx
"use client"

import { Calendar } from "@/components/ui/calendar"

export function CalendarCaption() {
  return (
    <Calendar
      mode="single"
      captionLayout="dropdown"
      className="rounded-lg border"
    />
  )
}
```

### View code 18

```tsx
"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"

export function CalendarBookedDates() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), 0, 6)
  )
  const bookedDates = Array.from(
    { length: 15 },
    (_, i) => new Date(new Date().getFullYear(), 0, 12 + i)
  )

  return (
    <Card className="mx-auto w-fit p-0">
      <CardContent className="p-0">
        <Calendar
          mode="single"
          defaultMonth={date}
          selected={date}
          onSelect={setDate}
          disabled={bookedDates}
          modifiers={{
            booked: bookedDates,
          }}
          modifiersClassNames={{
            booked: "[&>button]:line-through opacity-100",
          }}
        />
      </CardContent>
    </Card>
  )
}
```

### View code 19

```tsx
"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"

export function CalendarWeekNumbers() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), 0, 12)
  )

  return (
    <Card className="mx-auto w-fit p-0">
      <CardContent className="p-0">
        <Calendar
          mode="single"
          defaultMonth={date}
          selected={date}
          onSelect={setDate}
          showWeekNumber
        />
      </CardContent>
    </Card>
  )
}
```

### View code 20

```tsx
"use client"

import * as React from "react"
import { arSA, he } from "react-day-picker/locale"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import { Calendar } from "@/components/ui/calendar"

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

const locales = {
  ar: arSA,
  he: he,
} as const

export function CalendarRtl() {
  const { dir, language } = useTranslation(translations, "ar")
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-lg border [--cell-size:--spacing(9)]"
      captionLayout="dropdown"
      dir={dir}
      locale={
        dir === "rtl" ? locales[language as keyof typeof locales] : undefined
      }
    />
  )
}
```

## Date Picker

Fuente: https://ui.shadcn.com/docs/components/date-picker


### View code 1

```tsx
"use client"

import * as React from "react"
import { cn } from "cn"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            data-empty={!date}
            className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
          />
        }
      >
        <CalendarIcon />
        {date ? format(date, "PPP") : <span>Pick a date</span>}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  )
}
```

### View code 2

```tsx
"use client"

import * as React from "react"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger render={<Button variant={"outline"} data-empty={!date} className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground">{date ? format(date, "PPP") : <span>Pick a date</span>}<ChevronDownIcon data-icon="inline-end" /></Button>} />
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          defaultMonth={date}
        />
      </PopoverContent>
    </Popover>
  )
}
```

### View code 3

```tsx
"use client"

import * as React from "react"
```

### View code 4

```tsx
"use client"

import * as React from "react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerSimple() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Field className="mx-auto w-44">
      <FieldLabel htmlFor="date-picker-simple">Date</FieldLabel>
      <Popover>
        <PopoverTrigger render={<Button variant="outline" id="date-picker-simple" className="justify-start font-normal">{date ? format(date, "PPP") : <span>Pick a date</span>}</Button>} />
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            defaultMonth={date}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
```

## Combobox

Fuente: https://ui.shadcn.com/docs/components/combobox


### View code 1

```tsx
const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

export function ExampleCombobox() {
  return (
    <Combobox items={frameworks}>
      <ComboboxInput placeholder="Select a framework" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
```

### View code 2

```tsx
import * as React from "react"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

type Framework = {
  label: string
  value: string
}

const frameworks: Framework[] = [
  { label: "Next.js", value: "next" },
  { label: "SvelteKit", value: "sveltekit" },
  { label: "Nuxt", value: "nuxt" },
]

export function ExampleComboboxCustomItems() {
  return (
    <Combobox
      items={frameworks}
      itemToStringValue={(framework) => framework.label}
    >
      <ComboboxInput placeholder="Select a framework" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(framework) => (
            <ComboboxItem key={framework.value} value={framework}>
              {framework.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
```

### View code 3

```tsx
"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const

export function ComboboxBasic() {
  return (
    <Combobox items={frameworks}>
      <ComboboxInput placeholder="Select a framework" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
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

import * as React from "react"
```

### View code 6

```tsx
"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const

export function ComboboxWithClear() {
  return (
    <Combobox items={frameworks} defaultValue={frameworks[0]}>
      <ComboboxInput placeholder="Select a framework" showClear />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
```

### View code 7

```tsx
"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const

export function ComboboxInvalid() {
  return (
    <Combobox items={frameworks}>
      <ComboboxInput placeholder="Select a framework" aria-invalid="true" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
```

### View code 8

```tsx
"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const

export function ComboboxDisabled() {
  return (
    <Combobox items={frameworks}>
      <ComboboxInput placeholder="Select a framework" disabled />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
```

### View code 9

```tsx
"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const

export function ComboboxAutoHighlight() {
  return (
    <Combobox items={frameworks} autoHighlight>
      <ComboboxInput placeholder="Select a framework" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
```

### View code 10

```tsx
"use client"

import { Button } from "@/components/ui/button"
```

### View code 11

```tsx
"use client"

import { GlobeIcon } from "lucide-react"
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

## Accordion

Fuente: https://ui.shadcn.com/docs/components/accordion


### View code 1

```tsx
<Accordion defaultValue={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### View code 2

```tsx
import {
  Accordion,
  AccordionContent,
```

### View code 3

```tsx
"use client"

import * as React from "react"
```

## Breadcrumb

Fuente: https://ui.shadcn.com/docs/components/breadcrumb


### View code 1

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink render={<a href="/" />}>Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink render={<a href="/components" />}>
        Components
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

### View code 2

```tsx
import Link from "next/link"

import {
```

### View code 3

```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function BreadcrumbBasic() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
```

### View code 4

```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
```

### View code 5

```tsx
import Link from "next/link"
import { DotIcon } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function BreadcrumbSeparatorDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="/">Home</Link>} />
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <DotIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="/components">Components</Link>} />
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <DotIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
```

### View code 6

```tsx
import Link from "next/link"
import { DotIcon } from "lucide-react"
```

### View code 7

```tsx
import Link from "next/link"
import { ChevronDownIcon, DotIcon } from "lucide-react"
```

### View code 8

```tsx
import Link from "next/link"

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function BreadcrumbEllipsisDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="/">Home</Link>} />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="/docs/components">Components</Link>} />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
```

### View code 9

```tsx
import Link from "next/link"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function BreadcrumbLinkDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="#link-component">Home</Link>} />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="#link-component">Components</Link>} />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
```

### View code 10

```tsx
"use client"

import Link from "next/link"
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

## Dialog

Fuente: https://ui.shadcn.com/docs/components/dialog


### View code 1

```tsx
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

### View code 2

```tsx
import { Button } from "@/components/ui/button"
import {
  Dialog,
```

### View code 3

```tsx
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function DialogNoCloseButton() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">No Close Button</Button>} />
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>No Close Button</DialogTitle>
          <DialogDescription>
            This dialog doesn't have a close button in the top-right
            corner.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
```

### View code 4

```tsx
"use client"

import {
```

## Alert Dialog

Fuente: https://ui.shadcn.com/docs/components/alert-dialog


### View code 1

```tsx
<AlertDialog>
  <AlertDialogTrigger render={<Button variant="outline" />}>
    Show Dialog
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### View code 2

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="outline">Show Dialog</Button>} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
```

### View code 3

```tsx
import {
  AlertDialog,
  AlertDialogAction,
```

### View code 4

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function AlertDialogSmall() {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="outline">Show Dialog</Button>}
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
          <AlertDialogDescription>
            Do you want to allow the USB accessory to connect to this device?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Don't allow</AlertDialogCancel>
          <AlertDialogAction>Allow</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
```

### View code 5

```tsx
import { CircleFadingPlusIcon } from "lucide-react"

import {
```

### View code 6

```tsx
import { BluetoothIcon } from "lucide-react"

import {
```

### View code 7

```tsx
import { Trash2Icon } from "lucide-react"

import {
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

## Context Menu

Fuente: https://ui.shadcn.com/docs/components/context-menu


### View code 1

```tsx
<ContextMenu>
  <ContextMenuTrigger>Right click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Profile</ContextMenuItem>
    <ContextMenuItem>Billing</ContextMenuItem>
    <ContextMenuItem>Team</ContextMenuItem>
    <ContextMenuItem>Subscription</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

### View code 2

```tsx
<ContextMenu>
  <ContextMenuTrigger>Right click here</ContextMenuTrigger>
  <ContextMenuContent side="inline-end">
    <ContextMenuItem>Profile</ContextMenuItem>
    <ContextMenuItem>Billing</ContextMenuItem>
    <ContextMenuItem>Team</ContextMenuItem>
    <ContextMenuItem>Subscription</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

### View code 3

```tsx
import {
  ContextMenu,
  ContextMenuCheckboxItem,
```

### View code 4

```tsx
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export function ContextMenuBasic() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm">
        <span className="hidden pointer-fine:inline-block">
          Right click here
        </span>
        <span className="hidden pointer-coarse:inline-block">
          Long press here
        </span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem>Back</ContextMenuItem>
          <ContextMenuItem disabled>Forward</ContextMenuItem>
          <ContextMenuItem>Reload</ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}
```

### View code 5

```tsx
import {
  ContextMenu,
  ContextMenuContent,
```

### View code 6

```tsx
import {
  ClipboardPasteIcon,
  CopyIcon,
```

### View code 7

```tsx
"use client"

import * as React from "react"
```

### View code 8

```tsx
import { ArchiveIcon, PencilIcon, ShareIcon, TrashIcon } from "lucide-react"

import {
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

## Command

Fuente: https://ui.shadcn.com/docs/components/command


### View code 1

```tsx
<Command className="max-w-sm rounded-lg border">
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search Emoji</CommandItem>
      <CommandItem>Calculator</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>Profile</CommandItem>
      <CommandItem>Billing</CommandItem>
      <CommandItem>Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```

### View code 2

```tsx
import {
  Calculator,
  Calendar,
```

### View code 3

```tsx
"use client"

import * as React from "react"
```

## Alert

Fuente: https://ui.shadcn.com/docs/components/alert


### View code 1

```tsx
<Alert>
  <InfoIcon />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components and dependencies to your app using the cli.
  </AlertDescription>
  <AlertAction>
    <Button variant="outline">Enable</Button>
  </AlertAction>
</Alert>
```

### View code 2

```tsx
import { CheckCircle2Icon, InfoIcon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertDemo() {
  return (
    <div className="grid w-full max-w-md items-start gap-4">
      <Alert>
        <CheckCircle2Icon />
        <AlertTitle>Payment successful</AlertTitle>
        <AlertDescription>
          Your payment of $29.99 has been processed. A receipt has been sent to
          your email address.
        </AlertDescription>
      </Alert>
      <Alert>
        <InfoIcon />
        <AlertTitle>New feature available</AlertTitle>
        <AlertDescription>
          We've added dark mode support. You can enable it in your account
          settings.
        </AlertDescription>
      </Alert>
    </div>
  )
}
```

### View code 3

```tsx
import { CheckCircle2Icon, InfoIcon } from "lucide-react"

import {
```

### View code 4

```tsx
import { CheckCircle2Icon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertBasic() {
  return (
    <Alert className="max-w-md">
      <CheckCircle2Icon />
      <AlertTitle>Account updated successfully</AlertTitle>
      <AlertDescription>
        Your profile information has been saved. Changes will be reflected
        immediately.
      </AlertDescription>
    </Alert>
  )
}
```

### View code 5

```tsx
import { AlertCircleIcon } from "lucide-react"

import {
```

### View code 6

```tsx
import { AlertCircleIcon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertDestructive() {
  return (
    <Alert variant="destructive" className="max-w-md">
      <AlertCircleIcon />
      <AlertTitle>Payment failed</AlertTitle>
      <AlertDescription>
        Your payment could not be processed. Please check your payment method
        and try again.
      </AlertDescription>
    </Alert>
  )
}
```

### View code 7

```tsx
import { CheckCircle2Icon } from "lucide-react"

import {
```

### View code 8

```tsx
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export function AlertActionExample() {
  return (
    <Alert className="max-w-md">
      <AlertTitle>Dark mode is now available</AlertTitle>
      <AlertDescription>
        Enable it under your profile settings to get started.
      </AlertDescription>
      <AlertAction>
        <Button size="xs" variant="default">
          Enable
        </Button>
      </AlertAction>
    </Alert>
  )
}
```

### View code 9

```tsx
import {
  Alert,
  AlertAction,
```

### View code 10

```tsx
import { AlertTriangleIcon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertColors() {
  return (
    <Alert className="max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
      <AlertTriangleIcon />
      <AlertTitle>Your subscription will expire in 3 days.</AlertTitle>
      <AlertDescription>
        Renew now to avoid service interruption or upgrade to a paid plan to
        continue using the service.
      </AlertDescription>
    </Alert>
  )
}
```

### View code 11

```tsx
import { AlertTriangleIcon } from "lucide-react"

import {
```

### View code 12

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

## Sonner

Fuente: https://ui.shadcn.com/docs/components/sonner


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

## Badge

Fuente: https://ui.shadcn.com/docs/components/badge


### View code 1

```tsx
<Badge variant="default | outline | secondary | destructive">Badge</Badge>
```

### View code 2

```tsx
import { Badge } from "@/components/ui/badge"

export function BadgeDemo() {
  return (
    <div className="flex w-full flex-wrap justify-center gap-2">
      <Badge>Badge</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  )
}
```

### View code 3

```tsx
import { Badge } from "@/components/ui/badge"

export function BadgeDemo() {
```

### View code 4

```tsx
import { Badge } from "@/components/ui/badge"

export function BadgeVariants() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
    </div>
  )
}
```

### View code 5

```tsx
import { Badge } from "@/components/ui/badge"

export function BadgeVariants() {
```

### View code 6

```tsx
import { BadgeCheck, BookmarkIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
```

### View code 7

```tsx
import { BadgeCheck, BookmarkIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"

export function BadgeWithIconLeft() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="secondary">
        <BadgeCheck data-icon="inline-start" />
        Verified
      </Badge>
      <Badge variant="outline">
        Bookmark
        <BookmarkIcon data-icon="inline-end" />
      </Badge>
    </div>
  )
}
```

### View code 8

```tsx
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
```

### View code 9

```tsx
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"

export function BadgeWithSpinner() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="destructive">
        <Spinner data-icon="inline-start" />
        Deleting
      </Badge>
      <Badge variant="secondary">
        Generating
        <Spinner data-icon="inline-end" />
      </Badge>
    </div>
  )
}
```

### View code 10

```tsx
import { ArrowUpRightIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"

export function BadgeAsLink() {
  return (
    <Badge render={<a href="#link">Open Link <ArrowUpRightIcon data-icon="inline-end" /></a>} />
  )
}
```

### View code 11

```tsx
import { ArrowUpRightIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
```

### View code 12

```tsx
import { Badge } from "@/components/ui/badge"

export function BadgeCustomColors() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
        Blue
      </Badge>
      <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
        Green
      </Badge>
      <Badge className="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
        Sky
      </Badge>
      <Badge className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
        Purple
      </Badge>
      <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
        Red
      </Badge>
    </div>
  )
}
```

### View code 13

```tsx
import { Badge } from "@/components/ui/badge"

export function BadgeCustomColors() {
```

### View code 14

```tsx
"use client"

import * as React from "react"
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

## Avatar

Fuente: https://ui.shadcn.com/docs/components/avatar


### View code 1

```tsx
<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
```

### View code 2

```tsx
<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
  <AvatarBadge className="bg-green-600 dark:bg-green-800" />
</Avatar>
```

### View code 3

```tsx
import {
  Avatar,
  AvatarBadge,
```

### View code 4

```tsx
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage
        src="https://github.com/shadcn.png"
        alt="@shadcn"
        className="grayscale"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
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
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function AvatarWithBadge() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
      <AvatarBadge className="bg-green-600 dark:bg-green-800" />
    </Avatar>
  )
}
```

### View code 7

```tsx
import { PlusIcon } from "lucide-react"

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function AvatarBadgeIconExample() {
  return (
    <Avatar className="grayscale">
      <AvatarImage src="https://github.com/pranathip.png" alt="@pranathip" />
      <AvatarFallback>PP</AvatarFallback>
      <AvatarBadge>
        <PlusIcon />
      </AvatarBadge>
    </Avatar>
  )
}
```

### View code 8

```tsx
import { PlusIcon } from "lucide-react"

import {
```

### View code 9

```tsx
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar"

export function AvatarGroupExample() {
  return (
    <AvatarGroup className="grayscale">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
        <AvatarFallback>LR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          src="https://github.com/evilrabbit.png"
          alt="@evilrabbit"
        />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  )
}
```

### View code 10

```tsx
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"

export function AvatarGroupCountExample() {
  return (
    <AvatarGroup className="grayscale">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
        <AvatarFallback>LR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          src="https://github.com/evilrabbit.png"
          alt="@evilrabbit"
        />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  )
}
```

### View code 11

```tsx
import { PlusIcon } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"

export function AvatarGroupCountIconExample() {
  return (
    <AvatarGroup className="grayscale">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
        <AvatarFallback>LR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          src="https://github.com/evilrabbit.png"
          alt="@evilrabbit"
        />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>
        <PlusIcon />
      </AvatarGroupCount>
    </AvatarGroup>
  )
}
```

### View code 12

```tsx
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function AvatarSizeExample() {
  return (
    <div className="flex flex-wrap items-center gap-2 grayscale">
      <Avatar size="sm">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  )
}
```

### View code 13

```tsx
"use client"

import {
```

### View code 14

```tsx
"use client"

import * as React from "react"
```

## Card

Fuente: https://ui.shadcn.com/docs/components/card


### View code 1

```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
    <CardAction>Card Action</CardAction>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
```

### View code 2

```tsx
function Example() {
  return <Card className="[--card-spacing:--spacing(6)]">...</Card>
}
```

### View code 3

```tsx
import { Button } from "@/components/ui/button"
import {
  Card,
```

### View code 4

```tsx
import { ChevronRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
```

### View code 5

```tsx
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
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

## Data Table

Fuente: https://ui.shadcn.com/docs/components/data-table


### View code 1

```tsx
type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  // ...
]
```

### View code 2

```tsx
"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { type DataTableFeatures } from "./data-table-features"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Payment>()

export const columns = columnHelper.columns([
  columnHelper.accessor("status", {
    header: "Status",
  }),
  columnHelper.accessor("email", {
    header: "Email",
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
  }),
])
```

### View code 3

```tsx
export const columns = columnHelper.columns([
  columnHelper.accessor("amount", {
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  }),
])
```

### View code 4

```tsx
"use client"

import * as React from "react"
import {
  useTable,
  type ColumnDef,
  type RowData,
  type SortingState,
} from "@tanstack/react-table"

export function DataTable<TData extends RowData>({
  columns,
  data,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useTable({
    features,
    data,
    columns,
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  })

  return (
    <div>
      <div className="overflow-hidden rounded-md border">
        <Table>{ ... }</Table>
      </div>
    </div>
  )
}
```

### View code 5

```tsx
"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

export const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),
])
```

### View code 6

```tsx
export const columns = columnHelper.columns([
  columnHelper.accessor("email", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  }),
])
```

### View code 7

```tsx
<DataTablePagination table={table} />
```

### View code 8

```tsx
<DataTableViewOptions table={table} />
```

### View code 9

```tsx
import { columns, Payment } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
```

### View code 10

```tsx
import { Button } from "@/components/ui/button"

export function DataTable<TData extends RowData>({
  columns,
  data,
}: DataTableProps<TData>) {
  const table = useTable({
    features,
    data,
    columns,
  })

  return (
    <div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          { // .... }
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
```

### View code 11

```tsx
"use client"

import { createColumnHelper } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

export const columns = columnHelper.columns([
  columnHelper.accessor("email", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  }),
])
```

### View code 12

```tsx
export function DataTable<TData extends RowData>({
  columns,
  data,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<ColumnVisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useTable({
    features,
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div>
      <div className="overflow-hidden rounded-md border">
        <Table />
      </div>
    </div>
  )
}
```

### View code 13

```tsx
<div className="flex-1 text-sm text-muted-foreground">
  {table.getFilteredSelectedRowModel().rows.length} of{" "}
  {table.getFilteredRowModel().rows.length} row(s) selected.
</div>
```

## Chart

Fuente: https://ui.shadcn.com/docs/components/chart


### View code 1

```tsx
import { Bar, BarChart } from "recharts"

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

export function MyChart() {
  return (
    <ChartContainer>
      <BarChart data={data}>
        <Bar dataKey="value" />
        <ChartTooltip content={<ChartTooltipContent />} />
      </BarChart>
    </ChartContainer>
  )
}
```

### View code 2

```tsx
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]
```

### View code 3

```tsx
import { Bar, BarChart, CartesianGrid } from "recharts"
```

### View code 4

```tsx
<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
  <BarChart accessibilityLayer data={chartData}>
    <CartesianGrid vertical={false} />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
  </BarChart>
</ChartContainer>
```

### View code 5

```tsx
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
```

### View code 6

```tsx
<ChartContainer config={chartConfig} className="h-[200px] w-full">
  <BarChart accessibilityLayer data={chartData}>
    <CartesianGrid vertical={false} />
    <XAxis
      dataKey="month"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
      tickFormatter={(value) => value.slice(0, 3)}
    />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
  </BarChart>
</ChartContainer>
```

### View code 7

```tsx
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
```

### View code 8

```tsx
<ChartContainer config={chartConfig} className="h-[200px] w-full">
  <BarChart accessibilityLayer data={chartData}>
    <CartesianGrid vertical={false} />
    <XAxis
      dataKey="month"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
      tickFormatter={(value) => value.slice(0, 3)}
    />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
  </BarChart>
</ChartContainer>
```

### View code 9

```tsx
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"
```

### View code 10

```tsx
<ChartContainer config={chartConfig} className="h-[200px] w-full">
  <BarChart accessibilityLayer data={chartData}>
    <CartesianGrid vertical={false} />
    <XAxis
      dataKey="month"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
      tickFormatter={(value) => value.slice(0, 3)}
    />
    <ChartTooltip content={<ChartTooltipContent />} />
    <ChartLegend content={<ChartLegendContent />} />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
  </BarChart>
</ChartContainer>
```

### View code 11

```tsx
import { Monitor } from "lucide-react"

import { type ChartConfig } from "@/components/ui/chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    icon: Monitor,
    // A color like 'hsl(220, 98%, 61%)' or 'var(--color-name)'
    color: "#2563eb",
    // OR a theme object with 'light' and 'dark' keys
    theme: {
      light: "#2563eb",
      dark: "#dc2626",
    },
  },
} satisfies ChartConfig
```

### View code 12

```tsx
@layer base {
  :root {
    --chart-1: oklch(0.646 0.222 41.116);
    --chart-2: oklch(0.6 0.118 184.704);
  }

  .dark {
    --chart-1: oklch(0.488 0.243 264.376);
    --chart-2: oklch(0.696 0.17 162.48);
  }
}
```

### View code 13

```tsx
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(220, 98%, 61%)",
  },
  tablet: {
    label: "Tablet",
    color: "oklch(0.5 0.2 240)",
  },
  laptop: {
    label: "Laptop",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig
```

### View code 14

```tsx
<Bar dataKey="desktop" fill="var(--color-desktop)" />
```

### View code 15

```tsx
const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
]
```

### View code 16

```tsx
<LabelList className="fill-(--color-desktop)" />
```

### View code 17

```tsx
<ChartTooltip content={<ChartTooltipContent />} />
```

### View code 18

```tsx
const chartData = [
  { browser: "chrome", visitors: 187, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
]

const chartConfig = {
  visitors: {
    label: "Total Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig
```

### View code 19

```tsx
<ChartTooltip
  content={<ChartTooltipContent labelKey="visitors" nameKey="browser" />}
/>
```

### View code 20

```tsx
<ChartLegend content={<ChartLegendContent />} />
```

### View code 21

```tsx
const chartData = [
  { browser: "chrome", visitors: 187, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
]

const chartConfig = {
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig
```

### View code 22

```tsx
<ChartLegend content={<ChartLegendContent nameKey="browser" />} />
```

### View code 23

```tsx
<LineChart accessibilityLayer />
```

### View code 24

```tsx
@layer base {
  :root {
    --chart-1: oklch(0.646 0.222 41.116);
    --chart-2: oklch(0.6 0.118 184.704);
    --chart-3: oklch(0.398 0.07 227.392);
    --chart-4: oklch(0.828 0.189 84.429);
    --chart-5: oklch(0.769 0.188 70.08);
  }

  .dark {
    --chart-1: oklch(0.488 0.243 264.376);
    --chart-2: oklch(0.696 0.17 162.48);
    --chart-3: oklch(0.769 0.188 70.08);
    --chart-4: oklch(0.627 0.265 303.9);
    --chart-5: oklch(0.645 0.246 16.439);
  }
}
```

### View code 25

```tsx
import { type ChartConfig } from "@/components/ui/chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig
```

### View code 26

```tsx
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig
```

### View code 27

```tsx
"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
```

### View code 28

```tsx
"use client"

import { Bar, BarChart } from "recharts"
```

### View code 29

```tsx
"use client"

import { Bar, BarChart, CartesianGrid } from "recharts"
```

## Carousel

Fuente: https://ui.shadcn.com/docs/components/carousel


### View code 1

```tsx
<Carousel>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

### View code 2

```tsx
<Carousel>
  <CarouselContent className="-ml-4">
    <CarouselItem className="pl-4">...</CarouselItem>
    <CarouselItem className="pl-4">...</CarouselItem>
    <CarouselItem className="pl-4">...</CarouselItem>
  </CarouselContent>
</Carousel>
```

### View code 3

```tsx
<Carousel>
  <CarouselContent className="-ml-2 md:-ml-4">
    <CarouselItem className="pl-2 md:pl-4">...</CarouselItem>
    <CarouselItem className="pl-2 md:pl-4">...</CarouselItem>
    <CarouselItem className="pl-2 md:pl-4">...</CarouselItem>
  </CarouselContent>
</Carousel>
```

### View code 4

```tsx
<Carousel orientation="vertical | horizontal">
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
</Carousel>
```

### View code 5

```tsx
<Carousel
  opts={{
    align: "start",
    loop: true,
  }}
>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
</Carousel>
```

### View code 6

```tsx
import { type CarouselApi } from "@/components/ui/carousel"

export function Example() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <Carousel setApi={setApi}>
      <CarouselContent>
        <CarouselItem>...</CarouselItem>
        <CarouselItem>...</CarouselItem>
        <CarouselItem>...</CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}
```

### View code 7

```tsx
import { type CarouselApi } from "@/components/ui/carousel"

export function Example() {
  const [api, setApi] = React.useState<CarouselApi>()

  React.useEffect(() => {
    if (!api) {
      return
    }

    api.on("select", () => {
      // Do something on select.
    })
  }, [api])

  return (
    <Carousel setApi={setApi}>
      <CarouselContent>
        <CarouselItem>...</CarouselItem>
        <CarouselItem>...</CarouselItem>
        <CarouselItem>...</CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}
```

### View code 8

```tsx
import Autoplay from "embla-carousel-autoplay"

export function Example() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      // ...
    </Carousel>
  )
}
```

### View code 9

```tsx
<Carousel
  dir={dir}
  opts={{
    direction: dir,
  }}
>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
  <CarouselPrevious className="rtl:rotate-180" />
  <CarouselNext className="rtl:rotate-180" />
</Carousel>
```

### View code 10

```tsx
import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselDemo() {
  return (
    <Carousel className="w-full max-w-[12rem] sm:max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
```

### View code 11

```tsx
import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
```

### View code 12

```tsx
import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselSize() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-[12rem] sm:max-w-xs md:max-w-sm"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
```

### View code 13

```tsx
import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselSpacing() {
  return (
    <Carousel className="w-full max-w-[12rem] sm:max-w-xs md:max-w-sm">
      <CarouselContent className="-ml-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-1/2 pl-1 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-2xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
```

### View code 14

```tsx
import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselOrientation() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      orientation="vertical"
      className="w-full max-w-xs"
    >
      <CarouselContent className="-mt-1 h-[270px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-1/2 pt-1">
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
```

### View code 15

```tsx
"use client"

import * as React from "react"
```

## Aspect Ratio

Fuente: https://ui.shadcn.com/docs/components/aspect-ratio


### View code 1

```tsx
<AspectRatio ratio={16 / 9}>
  <Image src="..." alt="Image" className="rounded-md object-cover" />
</AspectRatio>
```

### View code 2

```tsx
import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"
```

### View code 3

```tsx
import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"

export function AspectRatioDemo() {
  return (
    <AspectRatio ratio={16 / 9} className="w-full max-w-sm rounded-lg bg-muted">
      <Image
        src="https://avatar.vercel.sh/shadcn1"
        alt="Photo"
        fill
        className="rounded-lg object-cover grayscale dark:brightness-20"
      />
    </AspectRatio>
  )
}
```

### View code 4

```tsx
import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"

export function AspectRatioSquare() {
  return (
    <AspectRatio
      ratio={1 / 1}
      className="w-full max-w-[12rem] rounded-lg bg-muted"
    >
      <Image
        src="https://avatar.vercel.sh/shadcn1"
        alt="Photo"
        fill
        className="rounded-lg object-cover grayscale dark:brightness-20"
      />
    </AspectRatio>
  )
}
```

### View code 5

```tsx
import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"

export function AspectRatioPortrait() {
  return (
    <AspectRatio
      ratio={9 / 16}
      className="w-full max-w-[10rem] rounded-lg bg-muted"
    >
      <Image
        src="https://avatar.vercel.sh/shadcn1"
        alt="Photo"
        fill
        className="rounded-lg object-cover grayscale dark:brightness-20"
      />
    </AspectRatio>
  )
}
```

### View code 6

```tsx
"use client"

import * as React from "react"
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

## Collapsible

Fuente: https://ui.shadcn.com/docs/components/collapsible


### View code 1

```tsx
<Collapsible>
  <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
  <CollapsibleContent>
    Yes. Free to use for personal and commercial projects. No attribution
    required.
  </CollapsibleContent>
</Collapsible>
```

### View code 2

```tsx
import * as React from "react"

export function Example() {
  const [open, setOpen] = React.useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger>Toggle</CollapsibleTrigger>
      <CollapsibleContent>Content</CollapsibleContent>
    </Collapsible>
  )
}
```

### View code 3

```tsx
"use client"

import * as React from "react"
```

### View code 4

```tsx
import { ChevronDownIcon } from "@/registry/icons/__lucide__"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
```

### View code 5

```tsx
import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
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
