import { AvatarComponent, AvatarProps } from './AvatarComponent';
import { MessageComponent, MessageProps } from './MessageComponent';

interface DialogueBoxProps {
    avatar: AvatarProps;
    message: MessageProps;
}

export class DialogueBoxComponent implements DialogueBoxProps {
    avatar: AvatarProps;
    message: MessageProps;

    private dialogueContainer: HTMLDivElement;
    private avatarComponent: AvatarComponent;
    private messageComponent: MessageComponent;

    constructor(avatar: AvatarProps, message: MessageProps) {
        this.avatar = avatar;
        this.message = message;

        this.dialogueContainer = document.createElement('div');
        this.dialogueContainer.className = 'dialogue-box';

        this.avatarComponent = new AvatarComponent(this.avatar.name, this.avatar.image);
        this.messageComponent = new MessageComponent(this.message.message);

        this.setupDOM();

        // This event will be triggered from the pagination logic (when the 'Close' button is clicked)
        document.addEventListener('destroy', () => {
            this.dialogueContainer.remove();
        });
    }

    private setupDOM(): void {
        let avatarContainer = this.avatarComponent.render();
        let messageContainer = this.messageComponent.render();

        this.dialogueContainer.appendChild(avatarContainer);
        this.dialogueContainer.appendChild(messageContainer);
    }

    render(): HTMLElement {
        return this.dialogueContainer;
    }
}