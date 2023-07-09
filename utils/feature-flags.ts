enum FeatureFlags {
    VERSION_2 = "version2"
}

const enabledFeatureFlags = ["version2"]

export const isVersionTwoEnabled = enabledFeatureFlags.includes(FeatureFlags.VERSION_2);