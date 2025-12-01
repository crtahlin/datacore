# Datacore Catalog

Available spaces, modules, and extensions for Datacore.

## Space Templates

Space templates provide starting points for team/organization workspaces.

| Template | Description | Repo | Status |
|----------|-------------|------|--------|
| datacore-org | Framework for autonomous organization management | datacore-one/datacore-org | Private |

### Using Space Templates

```bash
# Clone a space template
git clone https://github.com/datacore-one/datacore-org.git ~/Data/1-myorg

# Register in install.yaml
spaces:
  - id: 1-myorg
    name: My Organization
    type: team
    repo: https://github.com/your-org/your-space.git
```

## Modules

Modules extend Datacore with specialized agents and commands.

| Module | Description | Repo | Status |
|--------|-------------|------|--------|
| trading | Position management, performance tracking, trading workflows | datacore-one/datacore-trading | Private |

### Installing Modules

```bash
# Clone module to modules folder
git clone https://github.com/datacore-one/datacore-trading .datacore/modules/trading

# Register in install.yaml
modules:
  - trading
```

### Module Structure

Each module follows this structure:

```
.datacore/modules/[module-name]/
├── module.yaml           # Module metadata
├── agents/               # Specialized agents
├── commands/             # Slash commands
├── prompts/              # Prompt templates
├── templates/            # Output templates
├── workflows/            # n8n workflows (optional)
└── docs/                 # Module documentation
```

## Official Spaces

Team spaces managed by Datacore organization.

| Space | Description | Repo | Status |
|-------|-------------|------|--------|
| datacore-space | Datacore development team workspace | datacore-one/datacore-space | Private |
| datafund-space | Datafund team workspace | datacore-one/datafund-space | Private |

## Creating Your Own

### Custom Module

1. Create module structure in `.datacore/modules/[name]/`
2. Add `module.yaml` with metadata
3. Add agents and commands
4. Register in `install.yaml`

### Custom Space

1. Fork `datacore-org` template or create from scratch
2. Configure space-specific agents and workflows
3. Add as submodule or separate repo
4. Register in `install.yaml`

## Roadmap

Planned modules and spaces:

| Name | Type | Description | ETA |
|------|------|-------------|-----|
| research | Module | Academic research workflows | TBD |
| writing | Module | Long-form content creation | TBD |
| finance | Module | Personal finance tracking | TBD |

## Contributing

To contribute a module or space template:

1. Follow the structure guidelines above
2. Include documentation in `docs/`
3. Submit to datacore-one organization

---

*Last updated: 2025-12-01*
