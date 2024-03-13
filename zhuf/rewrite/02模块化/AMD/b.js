let factories = {}

function define(modName, dependencies, factory) {
  factory.dependencies = dependencies
  factories[modName] = factory
}

function require(modNames,callback) {
  let loadedModNames = modNames.map((modName) => {
    let factory = factories[modName]
    let dependencies = factory.dependencies
    let exports
    require(dependencies, (...dependencyMods) => {

    })
  })
}