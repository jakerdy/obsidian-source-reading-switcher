import { Plugin, MarkdownView, WorkspaceLeaf, Notice } from 'obsidian';

export default class ModeSwitcherPlugin extends Plugin
{

    async onload()
    {
        console.log('Loading Mode Switcher plugin');

        this.addCommand({
            id: 'toggle-source-reading-mode',
            name: 'Toggle Source/Reading Mode',
            // Recommended: Use checkCallback for better performance and context-awareness
            checkCallback: (checking: boolean) =>
            {
                // Get the active Markdown view
                const mdView = this.app.workspace.getActiveViewOfType(MarkdownView);

                // Check if we have an active Markdown view
                if (mdView)
                {
                    // If `checking` is true, we just need to verify the command can run
                    if (!checking)
                    {
                        // We are actually executing the command
                        this.toggleMode(mdView);
                    }
                    // Command can run, return true
                    return true;
                }
                // Command cannot run in the current context, return false
                return false;
            },
            // You can uncomment hotkeys to set a default, but it's often better
            // to let users configure it themselves to avoid conflicts.
            hotkeys: [
                {
                    modifiers: ["Mod"], // Mod = Cmd on macOS, Ctrl on Win/Linux
                    key: "E"
                }
            ]
        });
    }

    toggleMode(view: MarkdownView)
    {
        // Get the current state of the Markdown view
        const currentState = view.getState();

        // Determine the target mode
        // If currently in 'preview' (Reading View), switch to 'source'
        // Otherwise (if in 'source' or 'live'), switch to 'preview' (Reading View)
        const targetMode = currentState.mode === 'preview' ? 'source' : 'preview';

        // Create the new state, preserving existing properties but changing the mode
        const newState = {
            ...currentState,
            mode: targetMode
        };

        // Apply the new state to the view
        // { history: false } prevents this change from creating a back/forward navigation entry
        view.setState(newState, { history: false });

        console.log(`Switched view mode to: ${targetMode}`);
        // Optional: Show a brief notice (can be annoying, use sparingly)
        // new Notice(`Switched to ${targetMode === 'preview' ? 'Reading' : 'Source'} Mode`);
    }

    onunload()
    {
        console.log('Unloading Mode Switcher plugin');
    }
}