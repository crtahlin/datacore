---
title: Provenance Record Standards Research
date: 2026-01-06
type: research
tags:
  - provenance
  - standards
  - verity
  - datafund
  - planning
  - architecture
  - c2pa
  - w3c-prov
  - premis
  - blockchain
  - ipfs
  - storage
aliases:
  - provenance standards
  - provenance planning
  - provenance market research
  - provenance technology
  - content credentials
  - data provenance
---

# Provenance Record Standards

## Standards, Adoption, File Sizes & Storage Analysis

*Including Typical/Average Sizes and Storage Locations*

**Comprehensive Research Report — January 2026**

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [W3C PROV Family](#1-w3c-prov-family)
3. [Data & Trust Alliance Standards](#2-data--trust-alliance-standards)
4. [C2PA Content Credentials](#3-c2pa-content-credentials)
5. [PREMIS Digital Preservation](#4-premis-digital-preservation)
6. [AI Model Cards & ML Provenance](#5-ai-model-cards--ml-provenance)
7. [Blockchain & NFT Provenance](#6-blockchain--nft-provenance)
8. [Scientific Workflow Provenance](#7-scientific-workflow-provenance)
9. [Storage Location Summary](#8-storage-location-summary)
10. [Comparative Analysis](#9-comparative-analysis)
11. [Conclusions & Recommendations](#10-conclusions--recommendations)

---

## Executive Summary

This report provides comprehensive analysis of provenance record standards across multiple domains, including file sizes (with typical/average values) and storage location mechanisms. Understanding where provenance data is stored is critical for system architecture, compliance, and long-term preservation planning.

**Key storage patterns identified:**

1. **Embedded storage** within asset files is common for media (C2PA, EXIF)
2. **Sidecar/companion files** provide flexibility for formats that cannot embed metadata
3. **Cloud repositories and APIs** enable scalable access and recovery
4. **Decentralized technologies** (IPFS, blockchain) offer immutability guarantees
5. **Institutional repositories** with databases dominate scientific and preservation contexts

**Critical size insight:** For most common use cases, provenance records average 2-25KB. The C2PA specification recommends 25KB padding as a practical estimate. Scientific workflow provenance is the exception, with averages in the 1-10MB range.

---

## 1. W3C PROV Family

The W3C PROV family of specifications (2013 W3C Recommendations) represents the foundational standard for provenance interchange, with 60+ reported implementations across research and industry applications.

**Core Model:** Entity-Activity-Agent relationships

**Key Extensions:** ProvONE (scientific workflows), GDPRov (GDPR compliance), ProvCaRe (healthcare), CWLProv (Common Workflow Language)

### 1.1 File Size Analysis

| Format/Type | Minimum | Typical/Average | Maximum |
|-------------|---------|-----------------|---------|
| PROV-JSON | 200 bytes | 2-5 KB | 50+ KB |
| PROV-JSON-LD | 500 bytes | 3-8 KB | 100+ KB |
| PROV-XML | 500 bytes | 4-10 KB | 200+ KB |
| PROV-O/RDF (Turtle) | 300 bytes | 2-6 KB | 150+ KB |
| PROV-N (notation) | 200 bytes | 1-4 KB | 80+ KB |

> **Note:** JSON serialization is generally most compact; XML adds approximately 50-100% overhead due to verbose tags; RDF varies based on prefix usage and blank node handling.

### 1.2 Storage Locations

W3C PROV is storage-agnostic by design, allowing flexibility across implementation contexts:

- **RDF Triple Stores:** Primary storage for semantic web applications. Examples include AllegroGraph, GraphDB, Virtuoso, and Apache Jena. These support SPARQL queries and can scale to billions of triples.

- **Relational Databases:** Many implementations store PROV in traditional RDBMS (PostgreSQL, MySQL) with custom schemas mapping PROV entities to tables.

- **Document Stores:** MongoDB and similar NoSQL databases store PROV-JSON documents, enabling flexible schema evolution.

- **Public Repositories:** ProvStore (provenance.ecs.soton.ac.uk/store) is the first public W3C PROV repository, offering cloud storage with REST API access and OAuth support.

- **Embedded in Files:** PROV can be embedded in file headers or as companion metadata files alongside data assets.

---

## 2. Data & Trust Alliance Standards

The Data & Trust Alliance (D&TA) released v1.0.0 of their Data Provenance Standards in July 2024, developed by 26 member organizations (IBM, Mastercard, Humana, Pfizer, Walmart) representing $1.6 trillion in combined revenue.

**Structure:** Three core standards — Source, Provenance, Use

**Governance:** OASIS Technical Committee formed March 2025 (Cisco, IBM, Intel, Microsoft, Red Hat)

### 2.1 File Size Analysis

| Format/Type | Minimum | Typical/Average | Maximum |
|-------------|---------|-----------------|---------|
| Basic JSON metadata | 1 KB | 3-5 KB | 10 KB |
| XML format | 2 KB | 5-10 KB | 20 KB |
| With PET details | 5 KB | 15-25 KB | 50 KB |
| With full consent chain | 10 KB | 30-50 KB | 100 KB |

### 2.2 Storage Locations

D&TA standards are designed to integrate with existing enterprise data management infrastructure:

- **Data Catalogs:** Integration with platforms like Collibra, Alation, and Informatica for enterprise data governance.

- **Metadata Repositories:** Stored alongside datasets in data lakes (AWS S3, Azure Data Lake, Google Cloud Storage) as JSON/XML sidecar files.

- **Database Systems:** Metadata tables within data warehouses (Snowflake, Databricks, BigQuery) linking provenance to datasets.

- **API Services:** D&TA provides a metadata generator tool that outputs JSON, XML, YAML, or CSV formats for flexible integration.

- **Future Consideration:** D&TA is exploring blockchain and data watermarking for immutable records, though not yet prescribed due to implementation complexity.

---

## 3. C2PA Content Credentials

The Coalition for Content Provenance and Authenticity (C2PA) v2.2 specification (May 2025) defines Content Credentials using cryptographically signed JUMBF manifests.

**Coalition Members:** Adobe, Arm, Intel, Microsoft, Truepic

**Adopters:** OpenAI DALL-E 3, Adobe Creative Suite, Leica cameras, Associated Press, Google, TikTok

**Key Finding:** The C2PA FAQ states that a "typical Content Credential adds a small amount of data—often measured in kilobytes." The specification recommends 25KB padding for signature estimation.

### 3.1 File Size Analysis

| Format/Type | Minimum | Typical/Average | Maximum |
|-------------|---------|-----------------|---------|
| Minimal (signature only) | 5 KB | 8-12 KB | 15 KB |
| Standard (with assertions) | 15 KB | 20-25 KB | 50 KB |
| With ingredient manifests | 50 KB | 80-120 KB | 200+ KB |
| With cloud data refs | 20 KB | 35-50 KB | 100 KB |

> **OpenAI Overhead:** API adds 3-5% file size; ChatGPT interface adds up to 32%

### 3.2 Storage Locations

C2PA supports a hierarchy of storage mechanisms, with validators checking in sequence:

1. **Embedded in Asset (Primary):** C2PA manifests are embedded directly in supported file formats (JPEG, PNG, HEIF, MP4, PDF, etc.) using JUMBF (JPEG Universal Metadata Box Format). This keeps provenance with the asset.

2. **Sidecar Files:** For formats that cannot embed metadata (text, XML, Camera RAW), manifests are stored as companion `.c2pa` files in the same directory. Also useful when manifest size would significantly increase asset size.

3. **Remote/Cloud Manifests:** Manifests can be hosted on external servers with URLs embedded in asset metadata (typically XMP). Adobe has implemented a Content Credentials cloud service; others can deploy similar services.

4. **Manifest Repositories (Durable Content Credentials):** Cloud-based repositories that store manifests searchable via soft bindings (watermarks, fingerprints, perceptual hashes). Enables recovery when credentials are stripped.

5. **Decentralized Storage (IPFS):** Prototype implementations store C2PA manifests in IPFS, making them searchable via hashed URLs. This provides immutability and distributed availability.

**Validation Priority:** SDK checks embedded manifest first → sidecar file → remote URL reference

---

## 4. PREMIS Digital Preservation

PREMIS v3.0 (June 2015) is the de facto standard for digital preservation metadata, maintained by the Library of Congress.

**Data Model:** 5 entities — Object, Event, Agent, Rights, Intellectual Entity

**Adopters:** Library of Congress, NARA, Ex Libris Rosetta, Archivematica, Islandora

**Mandate:** Required in some countries for cultural heritage preservation

### 4.1 File Size Analysis

| Format/Type | Minimum | Typical/Average | Maximum |
|-------------|---------|-----------------|---------|
| Level 1 (minimal events) | 200 bytes | 500B-1 KB | 2 KB |
| Level 2 (standard metadata) | 2 KB | 5-15 KB | 50 KB |
| With technical metadata | 10 KB | 30-60 KB | 200 KB |
| Complex preservation graph | 100 KB | 500KB-2MB | 10+ MB |

### 4.2 Storage Locations

PREMIS implementations typically use institutional repository infrastructure:

- **Database Systems:** Most repositories store PREMIS in relational databases (PostgreSQL, Oracle, MySQL) for fast access, easy updates, and query capabilities. Entities (Objects, Events, Agents, Rights) map to database tables.

- **XML Files in Repository Storage:** PREMIS XML records stored as digital objects alongside the content they describe. Advantage: same preservation strategies apply to metadata and content.

- **METS Wrapper:** PREMIS is commonly embedded within METS (Metadata Encoding and Transmission Standard) documents in the administrative metadata section. METS+PREMIS packages are the standard for repository exchange.

- **Cloud Archives:** METS/PREMIS packages stored in cloud storage (AWS S3, Azure Blob) with metadata indexed in databases for discovery.

- **Archivematica/Islandora:** Open-source digital preservation systems that implement PREMIS storage within their internal databases and generate METS/PREMIS packages for export.

- **Hybrid Approach:** Critical metadata in database for performance; complete PREMIS records as XML files for portability and long-term preservation.

---

## 5. AI Model Cards & ML Provenance

Model Cards, introduced by Google in 2018 (Mitchell et al.), document AI/ML model provenance.

**Adoption:** 32,111 cards analyzed on Hugging Face (6,392 accounts); models with cards account for 90.5% of download traffic

**Growth:** Training section fill rate increasing 0.2%/week

**Related Standards:** Datasheets for Datasets, Croissant (JSON for ML datasets)

### 5.1 File Size Analysis

| Format/Type | Minimum | Typical/Average | Maximum |
|-------------|---------|-----------------|---------|
| Minimal (Markdown+YAML) | 1 KB | 3-5 KB | 8 KB |
| Standard model card | 5 KB | 8-12 KB | 20 KB |
| Comprehensive (Model Card++) | 20 KB | 40-60 KB | 100 KB |
| Dataset Cards (Croissant) | 2 KB | 10-20 KB | 50 KB |
| System Cards (full AI) | 100 KB | 500KB-1MB | 5+ MB |

### 5.2 Storage Locations

Model Cards follow a Git-based repository model:

- **README.md in Model Repository (Primary):** Model cards are stored as README.md files in Git repositories (Hugging Face Hub, GitHub). YAML frontmatter contains machine-readable metadata; Markdown body contains human-readable documentation.

- **Hugging Face Hub:** The dominant platform hosting 500K+ models with integrated model cards. Files stored via Git LFS for large model weights, with model card metadata indexed for search and filtering.

- **Model Registries:** MLflow, Weights & Biases, Neptune.ai store model metadata in their databases alongside model artifacts, with links to training runs and experiments.

- **Cloud Storage:** Model files (weights, configs) stored in S3, GCS, or Azure Blob; model card metadata often in accompanying JSON/YAML files or database records.

- **On-Premises Repositories:** Enterprise deployments use internal Git servers (GitLab, Bitbucket) or artifact repositories (JFrog Artifactory, Nexus) with model cards as README files.

- **API Metadata:** Hugging Face Hub API provides programmatic access to model card metadata, enabling automated extraction and aggregation.

---

## 6. Blockchain & NFT Provenance

NFT provenance uniquely combines on-chain and off-chain storage to balance cost, immutability, and accessibility.

**Primary Technology:** IPFS (InterPlanetary File System) for decentralized storage

**Major Projects:** Bored Ape Yacht Club (10K NFTs), CryptoPunks

**Pattern:** 70%+ of NFT collections use single-hash Merkle root approach

### 6.1 File Size Analysis

| Format/Type | Minimum | Typical/Average | Maximum |
|-------------|---------|-----------------|---------|
| On-chain hash only | 32 bytes | 32-64 bytes | 64 bytes |
| Basic JSON metadata | 200 bytes | 400-800 bytes | 2 KB |
| With traits/attributes | 1 KB | 1.5-3 KB | 10 KB |
| Collection directory (CID) | 46 bytes | 46 bytes | 46 bytes |
| Full collection manifest | 10 KB | 50-200 KB | 1+ MB |

### 6.2 Storage Locations

NFT provenance uses a layered storage architecture:

- **On-Chain (Blockchain):** Only essential data stored on-chain due to gas costs. Typically includes: ownership records, transaction history, token URI pointer (32-64 bytes), and optional provenance hash. Ethereum, Polygon, Solana are common chains.

- **IPFS (InterPlanetary File System):** Primary off-chain storage. Metadata JSON and media files stored on IPFS with Content Identifiers (CIDs). Data is content-addressed and immutable, but requires pinning services to ensure availability.

- **Pinning Services:** Pinata, NFT.Storage, Infura IPFS, and Filebase provide reliable IPFS hosting with guaranteed availability. NFT.Storage offers free storage specifically for NFT data.

- **Arweave:** Alternative permanent storage blockchain. One-time payment for permanent storage. Growing adoption for NFT metadata that must persist indefinitely.

- **Centralized Servers:** Some projects use traditional HTTP URLs for metadata. Discouraged due to single point of failure, but common for dynamic/updatable NFTs.

- **Fully On-Chain:** Small SVG images and metadata can be Base64-encoded directly on-chain. Limited to simple assets due to cost (e.g., Loot project).

- **Hybrid Approaches:** Many collections use Merkle tree roots on-chain (single hash for entire collection) with full metadata on IPFS.

---

## 7. Scientific Workflow Provenance

Scientific workflow provenance requires scalable storage for potentially massive provenance graphs.

**Systems:** Kepler, Taverna, Galaxy, COMPSs, Nextflow, Pegasus, Apache Airflow

**Standards:** ProvONE, CWLProv, Workflow Run RO-Crate (Schema.org + PROV)

**Scale Challenges:** MapReduce workflows can generate 11B+ UDF executions; metagenomics workflows process 48B+ base pairs

### 7.1 File Size Analysis

| Format/Type | Minimum | Typical/Average | Maximum |
|-------------|---------|-----------------|---------|
| Level 1 summary (metadata) | 1 KB | 5-20 KB | 100 KB |
| Level 2 (full provenance) | 100 KB | 1-10 MB | 100+ MB |
| RO-Crate manifest | 5 KB | 50-150 KB | 500 KB |
| CWLProv bundle | 100 KB | 1-5 MB | 100+ MB |
| Bioinformatics workflow | 1 MB | 10-50 MB | 1+ GB |

> **Research Finding:** PROV-IO+ experiments show provenance storage varies from a few KBs to 168MB depending on configuration. Provenance can be compressed to 0.4% of original size with less than 3.5% tracking overhead.

### 7.2 Storage Locations

Scientific workflow systems use specialized provenance storage:

- **Workflow Management System Databases:** Pegasus, Apache Airflow, Galaxy, Nextflow store provenance in their internal databases (PostgreSQL, SQLite, MySQL). Optimized for query performance during and after execution.

- **MonetDB/Specialized Databases:** High-performance columnar databases used for large-scale provenance analytics (e.g., DfAnalyzer with MonetDB).

- **RO-Crate Packages:** Research Object Crates bundle provenance metadata (JSON-LD) with workflow artifacts. Self-contained packages for archival and sharing via WorkflowHub.

- **Institutional Repositories:** Universities and research institutions archive workflow provenance in systems like DSpace, Fedora, or Dataverse.

- **HPC File Systems:** Large-scale provenance stored in parallel file systems (Lustre, GPFS) alongside computational results.

- **Cloud Object Storage:** AWS S3, Google Cloud Storage for provenance bundles, often with metadata indexed in databases for discovery.

- **Provenance-Specific Systems:** ProvLake, PROV-IO+ provide dedicated provenance capture and storage with optimized query interfaces.

---

## 8. Storage Location Summary

| Standard | Primary Storage | Alternative Storage | Decentralized Options |
|----------|----------------|---------------------|----------------------|
| W3C PROV | Triple stores, RDBMS | Document stores, files | ProvStore (public cloud) |
| D&TA | Data catalogs, warehouses | JSON/XML sidecar files | Blockchain (future) |
| C2PA | Embedded in asset | Sidecar .c2pa files | IPFS, manifest repos |
| PREMIS | Repository databases | METS XML packages | Cloud archives |
| Model Cards | Git repos (README.md) | Model registries | Hugging Face Hub |
| NFT/Blockchain | On-chain (minimal) | IPFS (primary) | Arweave (permanent) |
| Workflows | WMS databases | RO-Crate packages | Institutional repos |

### 8.1 Storage Architecture Patterns

| Pattern | Description | Best For | Pros | Cons |
|---------|-------------|----------|------|------|
| **Embedded** | Provenance stored within asset file | Media files (C2PA), portable assets | Provenance travels with asset | Format support required, file size increase |
| **Sidecar/Companion** | Separate file alongside asset | Formats without embedding support | No format modification needed | Files can become separated |
| **Database** | Relational or graph databases | Query-intensive, enterprise systems | Fast queries, scalability | Requires infrastructure, portability challenges |
| **Cloud Repository** | Hosted services with API access | Distributed teams, public sharing | Accessibility, managed infrastructure | Vendor dependency, connectivity required |
| **Decentralized** | IPFS, Arweave, blockchain | Immutability requirements, trustless environments | Tamper-evident, distributed | Complexity, cost (blockchain), availability (IPFS) |

---

## 9. Comparative Analysis

### 9.1 Size Comparison by Standard

| Standard | Min Size | Typical/Average | Max Size | Key Driver |
|----------|----------|-----------------|----------|------------|
| W3C PROV | 200B | 2-5 KB | 100+ KB | Complexity |
| D&TA | 1 KB | 3-5 KB | 100 KB | Consent/PETs |
| C2PA | 5 KB | 20-25 KB | 200+ KB | Ingredients |
| PREMIS | 200B | 5-15 KB | 10+ MB | Tech metadata |
| Model Cards | 1 KB | 8-12 KB | 5+ MB | Completeness |
| NFT/IPFS | 32B | 500B-2KB | 1+ MB | Traits count |
| Workflows | 1 KB | 1-10 MB | 1+ GB | Task count |

### 9.2 Variability Factors

- **Granularity Level:** Per-operation tracking vs. per-workflow summaries can cause 10-100x size differences.

- **Embedded vs. Referenced Data:** Inline embedding dramatically increases size; URI references keep records compact.

- **History Depth:** Single-event records vs. full lineage chains; each derivation step adds overhead.

- **Serialization Format:** JSON is typically most compact; XML adds 50-100% overhead; RDF varies by prefix usage.

- **Cryptographic Overhead:** Signatures (1-4KB), timestamps (200-500B), certificate chains (2-10KB) add fixed costs.

- **Compression:** Raw vs. gzipped can reduce sizes by 60-90% for text-based formats.

### 9.3 Adoption Comparison

| Standard | Primary Domain | Adoption Level | Key Drivers |
|----------|---------------|----------------|-------------|
| W3C PROV | Research/Academic | 60+ implementations | Interoperability, W3C backing |
| D&TA | Enterprise AI/Data | 50+ orgs testing | Regulatory compliance, trust |
| C2PA | Media/Content | Rapid growth | Misinformation concerns, major platform support |
| PREMIS | Cultural Heritage | De facto standard | Mandated by institutions, long history |
| Model Cards | ML/AI | 32K+ on HuggingFace | Community adoption, discoverability |
| NFT/Blockchain | Digital Assets | Millions of NFTs | Ownership verification, market demand |
| Workflows | Scientific Computing | Domain-specific | Reproducibility requirements |

---

## 10. Conclusions & Recommendations

### 10.1 Key Findings on Average Sizes

For most common provenance use cases, average record sizes fall within **2-25KB**. The C2PA specification's recommendation of 25KB padding provides a useful rule of thumb for content-oriented provenance. Scientific workflow provenance is the exception, with averages in the **1-10MB range** for full provenance capture.

### 10.2 Storage Selection Guidelines

| Application Type | Recommended Storage | Rationale |
|-----------------|---------------------|-----------|
| **Media/Content** | Embedded (C2PA) + cloud manifest repos | Portability + recovery capability |
| **Enterprise Data** | Data catalogs + database | Query performance + governance integration |
| **Digital Preservation** | Database + METS/PREMIS packages | Operational access + long-term portability |
| **AI/ML** | Git repos (HuggingFace) + experiment trackers | Version control + training lineage |
| **Scientific Research** | WMS database + RO-Crate packages | Runtime queries + publication/archival |
| **Web3/NFT** | Minimal on-chain + IPFS with pinning | Cost optimization + immutability |

### 10.3 Planning Recommendations

- **Content/Media Applications (C2PA):** Plan for 15-25KB average per asset, with 50-200KB for multi-source compositions.

- **Data Governance (D&TA/PROV):** Budget 3-10KB average per dataset or record.

- **Digital Preservation (PREMIS):** Expect 5-20KB for typical objects, 50-200KB with full technical metadata.

- **ML/AI (Model Cards):** Average 8-15KB for standard documentation, 50-100KB for comprehensive cards.

- **Scientific Workflows:** Plan for 1-50MB per workflow run; consider compression (achievable 0.4% reduction).

- **Blockchain/NFT:** On-chain minimal (32-64B hashes); off-chain metadata 500B-3KB average.

### 10.4 Future Trends

- **Convergence:** AI provenance standards converging with content authenticity (C2PA + Model Cards)

- **Regulatory Drivers:** EU AI Act, GDPR driving adoption of provenance standards

- **Cloud-Native:** Shift toward managed provenance services reducing operational overhead

- **Decentralization:** Growing IPFS and blockchain adoption for immutability guarantees

- **Compression:** Research showing 99%+ reduction possible while maintaining query capabilities

- **Interoperability:** Better tooling for moving provenance between storage systems

---

## References

### Standards Documents

- W3C PROV Family: https://www.w3.org/TR/prov-overview/
- C2PA Specification v2.2: https://c2pa.org/specifications/
- PREMIS Data Dictionary v3.0: https://www.loc.gov/standards/premis/
- D&TA Data Provenance Standards: https://dataandtrustalliance.org/

### Implementation Resources

- ProvStore: https://provenance.ecs.soton.ac.uk/store/
- C2PA Open Source Tools: https://opensource.contentauthenticity.org/
- Hugging Face Model Cards: https://huggingface.co/docs/hub/model-cards
- IPFS Documentation: https://docs.ipfs.tech/

---

*Report generated January 2026*
