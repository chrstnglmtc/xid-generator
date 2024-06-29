export async function followChecker(source, target) {
    try {
      const response = await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:SUDBYvZY/friendshipChecker?source=${source}&target=${target}`);
      const data = await response.json();
  
      if (data) {
        const { followed_by_source, followed_by_target } = data;
        return {
          sourceFollowsTarget: followed_by_source,
          targetFollowsSource: followed_by_target
        };
      } else {
        return {
          error: `No data found for source: ${source} and target: ${target}.`
        };
      }
    } catch (error) {
      return {
        error: `An error occurred: ${error.message}`
      };
    }
  }
  