#!/usr/bin/env python3
"""Mescla dependencies/devDependencies de um package.json (origem) em outro (destino)."""
import json
import sys

def main():
    if len(sys.argv) != 3:
        print("Uso: merge_package_json.py <origem.json> <destino.json>")
        sys.exit(1)

    src_path, dest_path = sys.argv[1], sys.argv[2]

    with open(src_path) as f:
        src = json.load(f)
    with open(dest_path) as f:
        dest = json.load(f)

    dest.setdefault("dependencies", {})
    dest.setdefault("devDependencies", {})

    for key, value in src.get("dependencies", {}).items():
        dest["dependencies"][key] = value
    for key, value in src.get("devDependencies", {}).items():
        dest["devDependencies"][key] = value

    with open(dest_path, "w") as f:
        json.dump(dest, f, indent=2)
        f.write("\n")

    print(f"Dependências mescladas em {dest_path}")

if __name__ == "__main__":
    main()
