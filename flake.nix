{
	description = "Go 1.22";

	inputs = {
		nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
	};

	outputs = { self, nixpkgs }: 
	let
		system = "x86_64-linux";
		pkgs = nixpkgs.legacyPackages.${system};
	in
	{
		devShells.${system}.default = 
			pkgs.mkShell
			{
				buildInputs = [
					pkgs.go
					pkgs.gopls
					pkgs.templ
				];
			};

			shellHook = ''
				echo "Hello"
			'';
	};
}
